import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

const petsQuestions: Question[] = [
  {
    question: "¿Cuál es el animal más rápido del mundo?",
    options: ["León", "Tigre", "Guepardo", "Elefante"],
    correctOption: 2,
  },
  {
    question: "¿Cuál es el animal más rápido del mundo?",
    options: ["León", "Tigre", "Guepardo", "Elefante"],
    correctOption: 2,
  },
  {
    question: "¿Cuál es el animal más rápido del mundo?",
    options: ["León", "Tigre", "Guepardo", "Elefante"],
    correctOption: 2,
  },
  {
    question: "¿Cuál es el animal más rápido del mundo?",
    options: ["León", "Tigre", "Guepardo", "Elefante"],
    correctOption: 2,
  },
];

interface PetsProps {
  onQuizEnd: (score: number) => void;
}

const Pets: React.FC<PetsProps> = ({ onQuizEnd }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setScore(0);
  };

  const handleOptionPress = (index: number) => {
    setSelectedOption(index);
    if (index === petsQuestions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < petsQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      onQuizEnd(score);
    }
  };

  return (
    <View style={styles.container}>
      {!quizStarted ? (
        <Button title="Start Quiz" onPress={startQuiz} />
      ) : (
        <>
          <Text style={styles.question}>
            {petsQuestions[currentQuestionIndex].question}
          </Text>
          {petsQuestions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                selectedOption === index ? styles.selectedOption : null,
              ]}
              onPress={() => handleOptionPress(index)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
          {selectedOption !== null && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    width: "80%",
  },
  question: {
    fontSize: 22,
    marginVertical: 20,
  },
  option: {
    padding: 6,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    width: "100%",
  },
  selectedOption: {
    backgroundColor: Colors.$lightSlateBlueColor,
  },
  optionText: {
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: Colors.$slateBlueColor,
    padding: 12,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 20,
    width: "50%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Pets;
