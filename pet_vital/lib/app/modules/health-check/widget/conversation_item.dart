import 'package:flutter/material.dart';

import '../model/message.dart';

class ConversationItem extends StatelessWidget {
  const ConversationItem({
    super.key,
    required this.message,
  });

  final Message message;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      title: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment:
            message.isUser ? MainAxisAlignment.end : MainAxisAlignment.start,
        children: message.isUser
            ? [
                Flexible(
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Colors.blueGrey[300],
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(30),
                        bottomLeft: Radius.circular(30),
                        bottomRight: Radius.circular(30),
                      ),
                    ),
                    child: Text(message.text),
                  ),
                ),
                const SizedBox(width: 5),
                CircleAvatar(
                  backgroundColor: Colors.blueGrey[200],
                  child: const Text(
                    '🙎🏼‍♂️',
                    style: TextStyle(fontSize: 26),
                  ),
                ),
              ]
            : [
                CircleAvatar(
                  backgroundColor: Colors.grey[200],
                  child: const Text(
                    '🤖',
                    style: TextStyle(fontSize: 26),
                  ),
                ),
                const SizedBox(width: 5),
                Flexible(
                  child: Container(
                    padding: const EdgeInsets.all(10),
                    decoration: BoxDecoration(
                      color: Colors.grey[300],
                      borderRadius: const BorderRadius.only(
                        topRight: Radius.circular(30),
                        bottomLeft: Radius.circular(30),
                        bottomRight: Radius.circular(30),
                      ),
                    ),
                    child: Text(
                      message.text,
                      style: TextStyle(color: Colors.black),
                    ),
                  ),
                ),
              ],
      ),
    );
  }
}
