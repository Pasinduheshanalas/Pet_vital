class Appointment {
  // String? id;
  String? date;
  String? petId;
  String? petName;
  String? remarks;
  String? status;
  String? vpetclinic;

  Appointment({
    // this.id,
    this.date,
    this.petId,
    this.petName,
    this.remarks,
    this.status,
    this.vpetclinic,
  });

  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'Date': date,
      'PetId': petId,
      'PetName': petName,
      'Remarks': remarks,
      'Status': status,
      '_vpetclinic': vpetclinic,
    };
  }

  Appointment.fromMap(Map<String, dynamic> Appointment) {
    // id = Appointment['id'];
    date = Appointment['Date'];
    petId = Appointment['PetId'];
    petName = Appointment['PetName'];
    remarks = Appointment['Remarks'];
    status = Appointment['Status'];
    vpetclinic = Appointment['_vpetclinic'];
  }
}
