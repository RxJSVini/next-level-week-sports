import "./styles/main.css";
import { useEffect, useState } from "react";
import logoImg from "./assets/nlw-sports-logo.svg";
import { GameBanner } from "./components/GameBanner";
import { CreateAdBanner } from "./components/CreateAdBanner";
import { api } from "./services/api";
import * as Dialog from '@radix-ui/react-dialog';
import { GameController } from "phosphor-react";
import Input from "./components/Form/input";

function App() {
  interface Games {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    };
  }
  
  const [games, setGames] = useState<Games[]>([]);
  const [modalState, setModalState] = useState<boolean>(false);

  useEffect(() =>{
    async function getGames(){
      const response = await api.get<Games[]>('/games');
      setGames(response.data);
    }

    getGames();
  }, []);


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
          Seu
        <span className="bg-nlw-gradient bg-clip-text text-transparent"> duo </span> está aqui
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
      {games.map((game) => (
          <GameBanner
            key={game.title}
            title={game.title}
            bannerUrl={game.bannerUrl}
            adsCount={game._count.ads}
          />
        ))}
      </div>
      <Dialog.Root open={true}>
          <CreateAdBanner/>
          <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
                  <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
                    <Dialog.Title className="text-3xl font-black">Publique um anúncio aqui</Dialog.Title>
                    <form className="mt-8 flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="game " className="font-semibold">Qual o game ?</label>
                          <Input 
                              type="text" 
                              id="game" 
                              placeholder="Selecione o jogo que deseja jogar"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="name">Seu nome(nickname)</label>
                          <Input type="text" id="name" placeholder="Como você se chama dentro do game ?"/>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                            <Input type="number" id="yearsPlaying" placeholder="Tudo bem ser ZERO"/>
                          </div>
                          <div className="flex flex-col gap-2">
                            <label htmlFor="discord">Qual seu discord?</label>
                            <Input type="text" id="discord" placeholder="Usuario#00000"/>
                          </div>
                        </div>
                        
                        <div className="flex gap-6">
                              <div className="flex flex-col gap-2">
                                <label htmlFor="weekDays">Quando costuma jogar?</label>
                   
                                    <div className="flex gap-1">
                                        <button title="Domingo"className="w-8 h-8 rounded bg-zinc-900">D</button>
                                        <button title="Segunda"className="w-8 h-8 rounded bg-zinc-900">S</button>
                                        <button title="Terça"  className="w-8 h-8 rounded bg-zinc-900">T</button>
                                        <button title="Quarta" className="w-8 h-8 rounded bg-zinc-900">Q</button>
                                        <button title="Quinta" className="w-8 h-8 rounded bg-zinc-900">Q</button>
                                        <button title="Sexta"  className="w-8 h-8 rounded bg-zinc-900">S</button>
                                        <button title="Sábado" className="w-8 h-8 rounded bg-zinc-900">S</button>
                                    </div>
                                </div>
                                <div className="glex flex-col gap-2 flex-1">
                                    <label htmlFor="housrStart">Qual horário do dia?</label>
                                    <Input id="hourStart" type="time" placeholder="De"/>
                                    <Input id="hourEnd" type="time" placeholder="Até"/>
                                </div>
                            </div>
                        <div>
                            <input type="checkbox"/>
                            Consumo me conectar ao chat de voz
                        </div>
                        <footer>
                          <button>Cancelar</button>
                          <button type="submit">
                            <GameController/>
                            Encontrar duo 
                          </button>
                        </footer>
                      </form>
                  </Dialog.Content>
            </Dialog.Portal>
      </Dialog.Root>

    </div>
  );
}

export default App;
