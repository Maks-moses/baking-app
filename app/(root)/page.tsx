import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSidebar";
import TotalBalance from "@/components/TotalBalance";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            title="Bienvenue"
            user={loggedIn?.name || "Guest"}
            subtext="Acceder et gérer votre compte et vos transactions efficacement"
            type="salut"
          />
          <TotalBalance
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={47013.35}
          />
        </header>
        RECENT TRANSACTIONS
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 47013.35 }, { currentBalance: 500.5 }]}
      />
    </section>
  );
};

export default Home;
