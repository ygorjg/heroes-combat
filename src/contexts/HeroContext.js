"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";

const HeroContext = createContext();

export const useHeroContext = () => useContext(HeroContext);

export const HeroProvider = ({ children }) => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [combatResult, setCombatResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [powerstatsComparison, setPowerstatsComparison] = useState({});

  const fetchHeroes = async () => {
    try {
      const response = await api.get();

      if (response.status === 200) {
        const data = response.data;
        setHeroes(data);
        setFilteredHeroes(data);
        setError(null);
      } else {
        setError("Erro ao buscar heróis.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleHeroSelection = (hero) => {
    if (selectedHeroes.length < 2) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }

    if (selectedHeroes.length === 1 && selectedHeroes[0].id !== hero.id) {
      const { winner, comparison } = determineWinner(selectedHeroes[0], hero);
      setCombatResult(winner);
      setPowerstatsComparison(comparison);
      setIsModalOpen(true);
    }
  };

  const determineWinner = (hero1, hero2) => {
    const powerstats1 = hero1.powerstats;
    const powerstats2 = hero2.powerstats;

    const powerstatsWinner = {};
    const comparison = {};
    let winner = null;

    for (const stat in powerstats1) {
      if (powerstats1[stat] > powerstats2[stat]) {
        powerstatsWinner[stat] = hero1.name;
        comparison[stat] = `${hero1.name} venceu ${hero2.name} em ${stat}`;
      } else if (powerstats2[stat] > powerstats1[stat]) {
        powerstatsWinner[stat] = hero2.name;
        comparison[stat] = `${hero2.name} venceu ${hero1.name} em ${stat}`;
      }
    }

    if (Object.keys(powerstatsWinner).length > 0) {
      winner = Object.keys(powerstatsWinner).reduce((prevStat, currStat) => {
        return powerstatsWinner[prevStat] > powerstatsWinner[currStat]
          ? prevStat
          : currStat;
      });
    }

    if (winner && powerstatsWinner[winner] === hero1.name) {
      winner = hero1;
    } else if (winner && powerstatsWinner[winner] === hero2.name) {
      winner = hero2;
    }

    return { winner, comparison };
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHeroes([]);
    setPowerstatsComparison({});
  };

  useEffect(() => {
    fetchHeroes();
  }, []);

  const contextValue = {
    heroes,
    setFilteredHeroes,
    filteredHeroes,
    combatResult,
    error,
    fetchHeroes,
    handleHeroSelection,
    handleCloseModal,
    isModalOpen,
    powerstatsComparison,
    selectedHeroes,
  };

  return (
    <HeroContext.Provider value={contextValue}>{children}</HeroContext.Provider>
  );
};
