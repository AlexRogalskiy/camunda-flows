import TreeNode from "primereact/components/treenode/TreeNode";

export const workflowTreeList:TreeNode [] = [
    {
        key: "baglantiProblemleri",
        label: "Bağlantı Problemleri",
        data: "category",
        children: [
            {
                key: "interneteGiremiyorum",
                label: "İnternete Giremiyorum",
                data: "subcategory",
                children:[]
            },
            {
                key: "sayfaAcamiyorum",
                label: "Sayfa Açamıyorum",
                data: "subcategory",
                children:[]
            },
            {
                key: "baglantimKopuyor",
                label: "Bağlantım Kopuyor",
                data: "subcategory",
                children:[]
            },
            {
                key: "hizimYavas",
                label: "Hızım Yavaş",
                data: "subcategory",
                children:[]
            },
            {
                key: "kablosuzAgAyarlari",
                label: "Kablosuz Ağ Ayarları",
                data: "subcategory",
                children:[]
            },
            {
                key: "portYonlendirme",
                label: "Port Yönlendirme",
                data: "subcategory",
                children:[]
            }
        ]
    },
    {
        key: "tvProblemleri",
        label: "TV Problemleri",
        data: "category",
        children: [
            {
                key: "siyahEkran",
                label: "Siyah Ekran",
                data: "subcategory",
                children:[]
            },
            {
                key: "yayinProblemi",
                label: "Yayın Problemi",
                data: "subcategory",
                children:[]
            },
            {
                key: "loginOlamiyorum",
                label: "Login Olamıyorum",
                data: "subcategory",
                children:[]
            },
            {
                key: "geriSarmaCalismiyor",
                label: "Geri Sarma Çalışmıyor",
                data: "subcategory",
                children:[]
            }
        ]
    },
    {
        key: "diagram1",
        label: "Arama Problemleri",
        data: "category",
        children:[]
    },
    {
        key: "churnTalebi",
        label: "Churn Talepleri",
        data: "category",
        children:[]
    },
    {
        key: "tvL1Kontrolleri",
        label: "TV L1 Kontrolleri",
        data: "category",
        children:[]
    }
];