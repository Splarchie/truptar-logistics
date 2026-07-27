import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  public type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    country : Text;
    passwordHash : Text;
  };

  public type Address = {
    name : Text;
    phone : Text;
    email : ?Text;
    address : Text;
    city : Text;
    country : Text;
  };

  public type ShipmentDetails = {
    description : Text;
    weight : Float;
    quantity : Nat;
    deliveryType : {
      #standard;
      #express;
      #priority;
    };
    category : {
      #document;
      #parcel;
      #cargo;
      #freight;
    };
  };

  public type ShippingOrder = {
    id : Text;
    sender : Address;
    receiver : Address;
    shipment : ShipmentDetails;
    status : {
      #pending;
      #processing;
      #in_transit;
      #out_for_delivery;
      #delivered;
      #cancelled;
    };
    owner : Principal;
  };

  public type ServiceRequest = {
    id : Text;
    serviceType : Text;
    submittedAt : Text;
    data : Text;
    submittedBy : Principal;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let userProfiles = Map.empty<Principal, UserProfile>();
  let shippingOrders = Map.empty<Text, ShippingOrder>();
  let serviceRequests = Map.empty<Text, ServiceRequest>();

  public shared ({ caller }) func registerUser(profile : UserProfile) : async () {
    if (userProfiles.containsKey(caller)) {
      Runtime.trap("User already registered");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func createShippingOrder(order : ShippingOrder) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create shipping orders");
    };
    let updatedOrder = {
      order with owner = caller;
    };
    shippingOrders.add(order.id, updatedOrder);
  };

  public query ({ caller }) func getMyShippingOrders() : async [ShippingOrder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their shipping orders");
    };
    shippingOrders.values().toArray().filter(
      func(order) {
        order.owner == caller;
      }
    );
  };

  public query ({ caller }) func getAllShippingOrders() : async [ShippingOrder] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all orders");
    };
    shippingOrders.values().toArray();
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, status : { #pending; #processing; #in_transit; #out_for_delivery; #delivered; #cancelled }) : async () {
    switch (shippingOrders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only order owner or admin can update status");
        };
        let updatedOrder = {
          order with status
        };
        shippingOrders.add(orderId, updatedOrder);
      };
    };
  };

  public query ({ caller }) func getShippingOrder(orderId : Text) : async ShippingOrder {
    switch (shippingOrders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?order) {
        if (order.owner != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Only order owner or admin can view order");
        };
        order;
      };
    };
  };

  public shared ({ caller }) func submitServiceRequest(req : ServiceRequest) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit service requests");
    };
    let newReq = {
      req with submittedBy = caller;
    };
    serviceRequests.add(req.id, newReq);
  };

  public query ({ caller }) func getAllServiceRequests() : async [ServiceRequest] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all service requests");
    };
    serviceRequests.values().toArray();
  };

  public query ({ caller }) func getMyServiceRequests() : async [ServiceRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their service requests");
    };
    let filtered = serviceRequests.entries().filter(
      func((_, req)) { req.submittedBy == caller }
    );
    filtered.map(func((_, req)) { req }).toArray();
  };
};
