import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    fullName : Text;
    panNumber : Text;
    dateOfBirth : Text;
    userId : Text;
    passwordHash : Text;
    contactInfo : Text;
  };

  public type RegistrationData = {
    fullName : Text;
    panNumber : Text;
    dateOfBirth : Text;
    userId : Text;
    passwordHash : Text;
    contactInfo : Text;
  };

  public type LoginData = {
    userId : Text;
    passwordHash : Text;
  };

  public type PasswordResetData = {
    userId : Text;
    dateOfBirth : Text;
    newPasswordHash : Text;
  };

  let userRecords = Map.empty<Principal, UserProfile>();

  // Anyone (including guests) can register a new account
  public shared ({ caller }) func registerUser(registrationData : RegistrationData) : async () {
    if (userRecords.values().any(func(profile) { profile.userId == registrationData.userId })) {
      Runtime.trap("User ID already exists");
    };

    let userProfile : UserProfile = {
      fullName = registrationData.fullName;
      panNumber = registrationData.panNumber;
      dateOfBirth = registrationData.dateOfBirth;
      userId = registrationData.userId;
      passwordHash = registrationData.passwordHash;
      contactInfo = registrationData.contactInfo;
    };

    userRecords.add(caller, userProfile);
  };

  // Anyone (including guests) can attempt to log in
  public shared ({ caller }) func loginUser(loginData : LoginData) : async () {
    let userProfiles = userRecords.values();
    let matchingUser = userProfiles.find(func(profile) { profile.userId == loginData.userId });

    switch (matchingUser) {
      case (null) { Runtime.trap("User ID not found") };
      case (?profile) {
        if (profile.passwordHash != loginData.passwordHash) {
          Runtime.trap("Invalid password");
        };
        // Authentication successful
        return ();
      };
    };
  };

  // Only authenticated users can log out
  public shared ({ caller }) func logoutUser() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only authenticated users can log out");
    };
    // No server-side session to terminate
  };

  // Get the caller's own profile — requires authenticated user
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their own profile");
    };
    userRecords.get(caller);
  };

  // Save/update the caller's own profile — requires authenticated user
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save their own profile");
    };
    userRecords.add(caller, profile);
  };

  // Get a specific user's profile — caller must be that user or an admin
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userRecords.get(user);
  };

  // Anyone (including guests) can reset their password using userId + dateOfBirth verification
  public shared ({ caller }) func resetPassword(resetData : PasswordResetData) : async () {
    let userProfiles = userRecords.values();
    let matchingUser = userProfiles.find(func(profile) { profile.userId == resetData.userId });

    switch (matchingUser) {
      case (null) { Runtime.trap("User ID not found") };
      case (?profile) {
        if (profile.dateOfBirth != resetData.dateOfBirth) {
          Runtime.trap("Date of Birth does not match");
        };

        let updatedProfile : UserProfile = {
          fullName = profile.fullName;
          panNumber = profile.panNumber;
          dateOfBirth = profile.dateOfBirth;
          userId = profile.userId;
          passwordHash = resetData.newPasswordHash;
          contactInfo = profile.contactInfo;
        };

        let entries = userRecords.entries();
        for ((principal, existingProfile) in entries) {
          if (existingProfile.userId == resetData.userId) {
            userRecords.add(principal, updatedProfile);
            return ();
          };
        };
        Runtime.trap("User profile not found in records");
      };
    };
  };
};
