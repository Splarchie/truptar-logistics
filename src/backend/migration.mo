import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  public type OldShippingOrder = {
    id : Text;
    sender : { name : Text; phone : Text; email : ?Text; address : Text; city : Text; country : Text };
    receiver : { name : Text; phone : Text; email : ?Text; address : Text; city : Text; country : Text };
    shipment : {
      description : Text;
      weight : Float;
      quantity : Nat;
      deliveryType : { #standard; #express; #priority };
      category : { #document; #parcel; #cargo; #freight };
    };
    status : { #pending; #in_transit; #delivered; #cancelled };
    owner : Principal;
  };

  type OldActor = {
    userProfiles : Map.Map<Principal, { name : Text; email : Text; phone : Text; country : Text; passwordHash : Text }>;
    shippingOrders : Map.Map<Text, OldShippingOrder>;
  };

  public type NewShippingOrder = {
    id : Text;
    sender : { name : Text; phone : Text; email : ?Text; address : Text; city : Text; country : Text };
    receiver : { name : Text; phone : Text; email : ?Text; address : Text; city : Text; country : Text };
    shipment : {
      description : Text;
      weight : Float;
      quantity : Nat;
      deliveryType : { #standard; #express; #priority };
      category : { #document; #parcel; #cargo; #freight };
    };
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

  public type NewUserProfile = {
    name : Text;
    email : Text;
    phone : Text;
    country : Text;
    passwordHash : Text;
  };

  public type NewServiceRequest = {
    id : Text;
    serviceType : Text;
    submittedAt : Text;
    data : Text;
    submittedBy : Principal;
  };

  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
    shippingOrders : Map.Map<Text, NewShippingOrder>;
    serviceRequests : Map.Map<Text, NewServiceRequest>;
  };

  public func run(old : OldActor) : NewActor {
    let newShippingOrders = old.shippingOrders.map<Text, OldShippingOrder, NewShippingOrder>(
      func(_, oldOrder) {
        {
          oldOrder with
          status = #pending // Old orders start as pending in new system
        };
      }
    );
    let emptyRequests = Map.empty<Text, NewServiceRequest>();
    {
      old with
      shippingOrders = newShippingOrders;
      serviceRequests = emptyRequests;
    };
  };
};
