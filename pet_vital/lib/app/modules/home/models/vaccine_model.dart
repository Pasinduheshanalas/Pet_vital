class Vaccine {
  // String? id;
  String? date;
  String? petId;
  String? petName;
  String? status;
  String? vaccine;
  String? vpetclinic;

  Vaccine({
    // this.id,
    this.date,
    this.petId,
    this.petName,
    this.status,
    this.vaccine,
    this.vpetclinic,
  });

  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'Date': date,
      'PetId': petId,
      'PetName': petName,
      'Status': status,
      'Vaccine': vaccine,
      '_vpetclinic': vpetclinic,
    };
  }

  Vaccine.fromMap(Map<String, dynamic> vaccin) {
    // id = Appointment['id'];
    date = vaccin['Date'];
    petId = vaccin['PetId'];
    petName = vaccin['PetName'];
    status = vaccin['Status'];
    vaccine = vaccin['Vaccine'];
    vpetclinic = vaccin['_vpetclinic'];
  }
}
