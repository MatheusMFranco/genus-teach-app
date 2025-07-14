import { useTheme } from './useTheme';

const Lump = () => {

    const { theme, toggleTheme } = useTheme();

    return (
        <div style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}>
            <h1>O tema atual é: {theme}</h1>
            <button onClick={toggleTheme}>Trocar tema</button>
        </div>
    );
}
export default Lump;