// styles.js

export const colors = {
    primaryDark: "#0D1B2A",  // Azul Oscuro
    primaryMedium: "#1B263B", // Azul Medio
    primaryLight: "#415A77", // Azul Claro
    accent: "#778A9A", // Azul Pastel
    white: "#E0E1DD", // Blanco
    black: "#000000", // Negro
};

export const typography = {
    fontPrimary: "'Montserrat', sans-serif", // Para títulos y encabezados
    fontSecondary: "'Open Sans', sans-serif", // Para textos largos y párrafos
};

export const layout = {
    container: {
        width: "90%",
        maxWidth: "1200px",
        margin: "0 auto",
    },
    sectionPadding: {
        padding: "50px 20px",
    },
};

export const buttons = {
    primary: {
        backgroundColor: colors.primaryDark,
        color: colors.white,
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontFamily: typography.fontPrimary,
        fontSize: "16px",
        fontWeight: "bold",
    },
    secondary: {
        backgroundColor: colors.primaryMedium,
        color: colors.white,
        padding: "8px 16px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        fontFamily: typography.fontSecondary,
        fontSize: "14px",
    },
};

export const textStyles = {
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        fontFamily: typography.fontPrimary,
        color: colors.primaryDark,
    },
    subtitle: {
        fontSize: "24px",
        fontWeight: "600",
        fontFamily: typography.fontSecondary,
        color: colors.primaryMedium,
    },
    paragraph: {
        fontSize: "16px",
        fontFamily: typography.fontSecondary,
        color: colors.primaryLight,
        lineHeight: "1.5",
    },
};