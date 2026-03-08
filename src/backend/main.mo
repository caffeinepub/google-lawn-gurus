import Map "mo:core/Map";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Text "mo:core/Text";

actor {
  type Submission = {
    name : Text;
    contactInfo : Text;
    message : Text;
    timestamp : Int;
  };

  module Submission {
    public func compare(submission1 : Submission, submission2 : Submission) : Order.Order {
      Int.compare(submission1.timestamp, submission2.timestamp);
    };
  };

  let submissions = Map.empty<Int, Submission>();

  public shared ({ caller }) func submitContactForm(name : Text, contactInfo : Text, message : Text) : async () {
    if (name.trim(#char ' ').size() == 0 or contactInfo.trim(#char ' ').size() == 0 or message.trim(#char ' ').size() == 0) {
      Runtime.trap("All fields must be filled out");
    };
    let timestamp = Time.now();
    let newSubmission : Submission = {
      name;
      contactInfo;
      message;
      timestamp;
    };
    submissions.add(timestamp, newSubmission);
  };

  public query ({ caller }) func getAllSubmissions() : async [Submission] {
    submissions.values().toArray().sort();
  };

  public query ({ caller }) func getSubmission(timestamp : Int) : async Submission {
    switch (submissions.get(timestamp)) {
      case (null) { Runtime.trap("Submission not found") };
      case (?submission) { submission };
    };
  };
};
