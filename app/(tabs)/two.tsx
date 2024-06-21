import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ViewProps,
} from "react-native";
import EditScreenInfo from "@/components/EditScreenInfo";
import Pets from "@/components/Pets";
import Sports from "@/components/Sports";
import Colors from "@/constants/Colors";

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "1", name: "Mascotas" },
  { id: "2", name: "Deportes" },
];

export default function TabTwoScreen() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [score, setScore] = useState<number | null>(null);

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
    setScore(null);
  };

  const handleQuizEnd = (score: number) => {
    setScore(score);
    setSelectedCategory(null);
    alert(`Quiz terminado! Puntuación: ${score}/10`);
  };

  return (
    <View style={styles.container}>
      {!selectedCategory && <Text style={styles.title}>Categorías</Text>}
      {!selectedCategory ? (
        <>
          <Text style={styles.title}>Selecciona una categoría</Text>
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleCategoryPress(item)}
              >
                <Text style={styles.cardText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            horizontal
          />
        </>
      ) : selectedCategory.name === "Mascotas" ? (
        <Pets onQuizEnd={handleQuizEnd} />
      ) : (
        <Sports onQuizEnd={handleQuizEnd} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.$slateBlueColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
