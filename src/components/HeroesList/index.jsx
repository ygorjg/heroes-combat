"use client";

import { useEffect } from "react";
import { useHeroContext } from "@/contexts/HeroContext";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import CombatResultModal from "../CombatResultModal";
import styled from "styled-components";

const ListContainer = styled(Paper)`
  padding: 20px;
  background-color: #fff;
  margin-top: 15px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 960px) {
    justify-content: center;
  }

  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const CardItem = styled.div`
  width: calc(25% - 20px);
  margin: 10px;

  @media (max-width: 960px) {
    width: calc(50% - 20px);
  }

  @media (max-width: 600px) {
    width: calc(100% - 20px);
  }
`;

const StyledCard = styled(Card)`
  cursor: pointer;
  border: 2px solid transparent;
  transition: border 0.3s;

  &:hover {
    border: 2px solid red;
  }
`;

const PowerStatsTypography = styled(Typography)`
  font-size: 14px;
`;

const HeroesList = () => {
  const {
    fetchHeroes,
    filteredHeroes,
    error,
    isModalOpen,
    handleCloseModal,
    combatResult,
    powerstatsComparison,
    selectedHeroes,
    handleHeroSelection,
  } = useHeroContext();

  useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  return (
    <ListContainer elevation={3}>
      <Typography variant="h5" component="div">
        Selecione dois heróis para o combate
      </Typography>
      {error ? (
        <Typography variant="body1" component="div">
          Erro ao buscar heróis: {error}
        </Typography>
      ) : (
        <CardContainer>
          {filteredHeroes.map((hero) => (
            <CardItem key={hero.id}>
              <StyledCard
                onClick={() => handleHeroSelection(hero)}
                isSelected={selectedHeroes.includes(hero)}
              >
                <CardMedia
                  component="img"
                  alt={hero.name}
                  height="140"
                  image={hero.images.sm}
                />
                <CardContent>
                  <Typography variant="h6">{hero.name}</Typography>
                  <PowerStatsTypography variant="body2">
                    Combat: {hero.powerstats.combat}
                  </PowerStatsTypography>
                  <PowerStatsTypography variant="body2">
                    Durability: {hero.powerstats.durability}
                  </PowerStatsTypography>
                  <PowerStatsTypography variant="body2">
                    Intelligence: {hero.powerstats.intelligence}
                  </PowerStatsTypography>
                  <PowerStatsTypography variant="body2">
                    Power: {hero.powerstats.power}
                  </PowerStatsTypography>
                  <PowerStatsTypography variant="body2">
                    Speed: {hero.powerstats.speed}
                  </PowerStatsTypography>
                  <PowerStatsTypography variant="body2">
                    Strength: {hero.powerstats.strength}
                  </PowerStatsTypography>
                </CardContent>
              </StyledCard>
            </CardItem>
          ))}
        </CardContainer>
      )}
      <CombatResultModal
        open={isModalOpen}
        onClose={handleCloseModal}
        winner={combatResult}
        powerstatsComparison={powerstatsComparison}
      />
    </ListContainer>
  );
};

export default HeroesList;
