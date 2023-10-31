import { HeroProvider } from "@/contexts/HeroContext";
import styles from "./page.module.css";
import Filter from "@/components/Filter";
import HeroesList from "@/components/HeroesList";

export default function Home() {
  return (
    <HeroProvider>
      <main className={styles.main}>
        <Filter />
        <HeroesList />
      </main>
    </HeroProvider>
  );
}
