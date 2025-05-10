class EventsModel {
  // String? id;
  String? date;
  String? eventName;
  String? remark;
  String? vpetclinic;

  EventsModel({
    // this.id,
    this.date,
    this.eventName,
    this.remark,
    this.vpetclinic,
  });

  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'Date': date,
      'EventName': eventName,
      'Remark': remark,
      '_vpetclinic': vpetclinic,
    };
  }

  EventsModel.fromMap(Map<String, dynamic> event) {
    // id = Appointment['id'];
    date = event['Date'];
    eventName = event['EventName'];
    remark = event['Remark'];
    vpetclinic = event['_vpetclinic'];
  }
}
