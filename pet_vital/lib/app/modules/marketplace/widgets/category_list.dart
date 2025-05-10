import 'package:flutter/material.dart';

import 'category_list_card.dart';

class CategoryList extends StatefulWidget {
  const CategoryList({Key? key}) : super(key: key);

  @override
  State<CategoryList> createState() => _CategoryListState();
}

class _CategoryListState extends State<CategoryList> {
  late int activeIndex;

  @override
  void initState() {
    super.initState();
    activeIndex = -1;
  }

  @override
  Widget build(BuildContext context) {
    List<String> categoryList = [
      'Vitamins',
      'Pet foods',
      'Shampoo',
      'Pet toys',
      'Accessories',
    ];
    return SizedBox(
      height: 45,
      child: ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: categoryList.length,
        shrinkWrap: true,
        itemBuilder: (_, int index) {
          return Padding(
            padding: const EdgeInsets.symmetric(horizontal: 2),
            child: CategoryListCard(
              title: categoryList[index],
              isActive: activeIndex == index,
              onTapCard: () {
                setState(() {
                  activeIndex = index;
                });
              },
            ),
          );
        },
      ),
    );
  }
}
