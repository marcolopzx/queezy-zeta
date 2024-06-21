import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Button } from "react-native";

interface Question {
  question: string;
  options: string[];
  correctOption: number;
}

const sportsQuestions: Question[] = [
  {
    question: "¿Cuál es el deporte más popular del mundo?",
    options: ["Baloncesto", "Béisbol", "Fútbol", "Tenis"],
    correctOption: 2,
  },
  {
    question:
      "¿En qué año se celebraron los primeros Juegos Olímpicos modernos?",
    options: ["1896", "1900", "1924", "1936"],
    correctOption: 0,
  },
  {
    question:
      "¿Qué jugador de baloncesto es conocido como 'Su Majestad Aérea'?",
    options: [
      "LeBron James",
      "Kobe Bryant",
      "Michael Jordan",
      "Shaquille O'Neal",
    ],
    correctOption: 2,
  },
  {
    question: "¿Qué país ganó la Copa Mundial de Fútbol en 2018?",
    options: ["Alemania", "Argentina", "Brasil", "Francia"],
    correctOption: 3,
  },
];

interface SportsProps {
  onQuizEnd: (score: number) => void;
}

const Sports: React.FC<SportsProps> = ({ onQuizEnd }) => {
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
    if (index === sportsQuestions[currentQuestionIndex].correctOption) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < sportsQuestions.length - 1) {
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
            {sportsQuestions[currentQuestionIndex].question}
          </Text>
          {sportsQuestions[currentQuestionIndex].options.map(
            (option, index) => (
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
            )
          )}
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    width: "80%",
    height: "60%",
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
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Sports;
