import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class GeminiApi {
  //header
  static Future<Map<String, String>> getHeader() async {
    return {
      'Content-Type': 'application/json',
    };
  }

  //http request
  static Future<String> getGeminiData(message) async {
    try {
      final header = await getHeader();

      final Map<String, dynamic> requestBody = {
        'contents': [
          {
            'parts': [
              {
                'text':
                    'Why my pet suffering $message and suggest me home treatments to it.',
              }
            ]
          }
        ],
        'generationConfig': {
          'temperature': 0.8,
          'maxOutputTokens': 1000,
        }
      };

      String url =
          'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyC4pROnnYIu2beVSz2sefUn8W5olREkbeQ';

      var res = await http.post(
        Uri.parse(url),
        headers: header,
        body: jsonEncode(requestBody),
      );

      debugPrint(res.body);

      if (res.statusCode == 200) {
        var jsonRes = jsonDecode(res.body) as Map<String, dynamic>;
        debugPrint("********************");
        debugPrint(jsonRes['candidates'][0]['content']['parts'][0]['text']);
        debugPrint("********************");
        return jsonRes['candidates'][0]['content']['parts'][0]['text'];
      } else {
        debugPrint(
            "Something went wrong getting data from gemini, status code : ${res.statusCode}");
        return '';
      }
    } catch (err) {
      debugPrint("Something went wrong when connecting with gemini : $err");
      return "";
    }
  }
}
