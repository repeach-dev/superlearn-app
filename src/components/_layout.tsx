import { MainPageProviders } from "@/api/Providers";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <MainPageProviders>
           {children}
        </MainPageProviders>
    )
}