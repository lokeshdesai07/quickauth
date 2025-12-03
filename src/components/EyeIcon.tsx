import Svg, { Path } from "react-native-svg";

export const EyeIcon = ({ open }: { open: boolean }) => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        {open ? (
            <Path
                d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                fill="currentColor"
                stroke="currentColor"
            />

        ) : (
            <>
                <Path d="M2 2L22 22" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></Path>
                <Path d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335" stroke="#000000"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></Path>
                <Path d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                    stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></Path>

            </>
        )}
    </Svg>
);