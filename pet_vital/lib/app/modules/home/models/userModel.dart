class User {
  // String? id;
  String? petName;
  String? category;
  String? type;
  String? vpetclinic;
  String? vaccinationHistory;
  String? specialRemarks;
  String? upcommingVdates;
  String? email;
  String? password;

  User({
    // this.id,
    this.petName,
    this.category,
    this.type,
    this.vpetclinic,
    this.vaccinationHistory,
    this.specialRemarks,
    this.upcommingVdates,
    this.email,
    this.password,
  });

  Map<String, dynamic> toMap() {
    return {
      // 'id': id,
      'PetName': petName,
      'Category': category,
      'Type': type,
      '_vpetclinic': vpetclinic,
      'vaccinationHistory': vaccinationHistory,
      'specialRemarks': specialRemarks,
      'upcommingVdates': upcommingVdates,
      'email': email,
      'password': password,
    };
  }

  User.fromMap(Map<String, dynamic> user) {
    // id = user['id'];
    petName = user['PetName'];
    category = user['Category'];
    type = user['Type'];
    vpetclinic = user['_vpetclinic'];
    vaccinationHistory = user['vaccinationHistory'];
    specialRemarks = user['specialRemarks'];
    upcommingVdates = user['upcommingVdates'];
    email = user['email'];
    password = user['password'];
  }
}
