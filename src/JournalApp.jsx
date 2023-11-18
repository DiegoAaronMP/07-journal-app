import { AppRouter } from "./router/AppRouter"
import { AppTheme } from "./theme/AppTheme"

export const JournalApp = () => {
    return (
        <>
            {/* Colocar el tema de MaterialUI */}
            <AppTheme>
                <AppRouter />
            </AppTheme>
        </>
    )
}
