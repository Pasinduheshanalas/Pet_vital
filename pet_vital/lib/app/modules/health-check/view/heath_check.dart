import 'package:flutter/material.dart';

import '../../../widgets/default_appbar_home.dart';
import '../model/message.dart';
import '../widget/conversation_item.dart';
import '../widget/user_input_field.dart';

class HeathCheck extends StatefulWidget {
  const HeathCheck({super.key});

  @override
  State<HeathCheck> createState() => _HeathCheckState();
}

class _HeathCheckState extends State<HeathCheck> {
  TextEditingController userInputController = TextEditingController();
  ScrollController scrollController = ScrollController();
  final List<Message> messages = [];
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const DefautAppBarHome(),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              controller: scrollController, // Attach ScrollController
              itemCount: messages.length,
              itemBuilder: (context, index) {
                final message = messages[index];
                return ConversationItem(message: message);
              },
            ),
          ),
          // Container(
          //   child: isLoading ? const ConversationLoadingItem() : null,
          // ),
          Container(
            padding: const EdgeInsets.only(left: 10, right: 10, bottom: 10),
            child: UserInputField(
              userInputController: userInputController,
              // onSend: handleUserChat,
              isLoading: isLoading,
            ),
          ),
        ],
      ),
    );
  }
}
