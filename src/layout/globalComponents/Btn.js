export default ({ children, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="bg-secondary text-white text-sm font-bold py-1 px-3 rounded-full"
        >{children}</button>
    )
}