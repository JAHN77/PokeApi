import logo_pokedex from "../assets/img/Pokedex_logo.png"
function NavBar(){
    return(
        <div className="bg-red-500 h-16 mb-10 fixed w-full ">
            
            <div className="flex justify-center items-center  p-2 h-full">
                <img src={logo_pokedex} alt="Logo"  className="h-full"/>
            </div>
            
        </div>
    )
}

export default NavBar