import { HeroProvider } from "@/contexts/HeroContext";
import styles from "./page.module.css";
import HeroesList from "@/components/HeroesList";

export default function Home() {
  return (
    <HeroProvider>
      <main className={styles.main}>
        <HeroesList />
      </main>
    </HeroProvider>
  );
}
