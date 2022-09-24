import { MagnifyingGlassPlus } from "phosphor-react";
export function CreateAdBanner(){
    return(
        <>
        <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden mt-8">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white gont-black block">
              Não encontrou seu duo ?
            </strong>
            <span className="text-zinc-400 block">
              Publique um aúncio para encontrar novos players!
            </span>
          </div>
          <button className="py-3 px-4 bg-violet-500 text-white rounded flex items-center gap-3">
            Publicar anúncio <MagnifyingGlassPlus size={24} />
          </button>
        </div>
      </div>
        </>
    )
}