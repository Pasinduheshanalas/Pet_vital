class PetCenterModel {
  String? id;
  String? name;

  PetCenterModel({
    this.id,
    this.name,
  });

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'name': name,
    };
  }

  PetCenterModel.fromMap(Map<String, dynamic> petCenter) {
    id = petCenter['id'];
    name = petCenter['name'];
  }
}
