import { CategoryItem, Product, ResidenceStory } from '../types';

export const BRAND_INFO = {
  name: "Maison d'Antique",
  koreanName: "메종 당티크",
  tagline: "Atelier & Archives Paris 1884",
  headline: "시간이 빚어낸 예술, 공간을 채우는 백 년의 헤리티지.",
  subheadline:
    "18~19세기 프랑스 루이 15세부터 영국 조지안 시대까지 — 메종 당티크가 엄선한 단 하나의 오리지널 빈티지 앤틱 컬렉션을 한남동 살롱에서 만나보세요.",
  announcement:
    "PARIS · LONDON · FLORENCE DIRECT CURATION — ALL PIECES CERTIFIED AUTHENTIC WITH PROVENANCE DEED",
  logoUrl:
    "https://lh3.googleusercontent.com/aida/AEtjO1VZlkjlXohzPlyYto1_W62UHwvmiOnT-7yl1s0B5ppQvbkqfv91xfYBTLkq8pmSTLPOIJqan6kufHHMLPVgavGRjfzno1hvUCGLFwnSy8cYhsQmdLUogq2cF0JQL1e5k_lHmOswXUJItQzxsd7jLReoSKQWP4pLrZhTdJEfDbOkfXUFqO1nnnZSYJVwWn71YXLCWyAYmEF3KrDWZsalGy3TDuAgwW-B90aJYXzlh81IkalBE6U3A0ckaQ",
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDG3U71UG2sag7nQaN1upmn1zWrQnzXY02ruI2hGXrq5TDNvU83YgjmO_yG9EDVJ7xhY2EkfmHOVVmonJNe_5iwO--N2OsB04DWSzfOthE8_wQz290_uVqWmBJu_rUTdObJKyPQtGO2qxMdySwi7bP0m0S6vfDbP8goS6g4nrqNwum0CCuMMRi4J9hWqNyNcUOn3DrGhT5828Av6L2H7ztIwtUaA2RS9Aq9EcgUgNhJkDse-o3NLHj5",
  atelierImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAtbmnIB-OJIfF9KjdI_t6DowxkBmcJIaG_nujcijO0Us7keypTUWkavk-JZh21-5H99_Gox3OrEsRRyMWg09yIDN9FK1X_tIZs8crMNaS-kTRFtML1uEKRXMOhB74Uzn2rGYZrhRtsikvm98bayXs5CShEMRnV2ZVFWEFlkzP2B6d1L9ssS08t80Yl7ITZGZB-FlejJAwhj6gBZUYW-BDuxyZM6lgKqUytPSyKG6nVOJr2p4VfvvJE",
  contact: {
    address: "서울특별시 용산구 한남대로 24길 18, 메종 당티크 살롱 (사전예약제)",
    atelier: "서울특별시 성동구 성수이로 14길 8, 당티크 복원연구소",
    email: "contact@maisondantique.kr",
    phone: "+82 (0)2 790 1884",
  },
};

export const FEATURED_SPECIMEN: Product = {
  id: "MDA-1782-PROV",
  name: "18세기 프랑스 루이 15세 오리지널 월넛 코모드",
  enName: "French Rococo Carved Solid Walnut & Rouge Griotte Marble Commode",
  period: "Louis XV Period · Circa 1780s",
  category: "french",
  originEra: "프랑스 프로방스, 1780년대 루이 15세 치세",
  materials: "유러피안 솔리드 월넛, 오르몰루 길트 브론즈(황동)",
  dimensions: "W 128 × D 62 × H 86 cm",
  price: 28500000,
  formattedPrice: "₩ 28,500,000",
  marble: "루즈 그리요트(Rouge Griotte) 대리석 오리지널",
  restorationStatus: "뮤지엄 그레이드 천연 셸락 보존 완료",
  refCode: "MDA-1782-PROV",
  tag1: "France, c. 1780s",
  tag2: "Curator's Masterpiece · One-of-a-Kind",
  provenanceDeed:
    "남프랑스 아비뇽의 귀족 가문 드 몽모랑시 저택에서 240여 년간 전승된 기록 문서 및 프랑스 문화재청 수출 공식 인가서(Certificat d'Exportation) 동봉.",
  description:
    "유려한 곡선의 봉베(Bombé) 바디와 화려한 루즈 그리요트 대리석이 결합된 18세기 프랑스 로코코의 정점입니다. 손으로 직접 조각한 아칸서스 잎사귀 오르몰루 마운트와 300년의 세월이 스민 깊은 목재 결이 공간에 압도적인 품격을 선사합니다.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB8hvFRZ_2YBabb72tjfp4SP3OpNE4wCZmKE9QXRJaudYk9e3_dYWnxv3fpnKz0gTz1lf-LBIu0YP962RbCaOxuJ7e56egyRIB0ERDrsJHdIaeFYvUwtWjdouaJt_G8rWqaKQvzQepVnHNSmbZ0aumx20lZTjenNYQr0Z1daslgAeLS-bSCTU5FQe7OppwT-Zf_9UQ9FAl21qHAbCoCjUj4HWrir-7u7uKSSknWUkKP4_cAE0wal2P1",
  imageAlt: "18세기 프랑스 루이 15세 오리지널 월넛 코모드",
  featured: true,
};

export const CATEGORIES: CategoryItem[] = [
  {
    id: "furniture",
    title: "대형 마스터피스 가구",
    subtitle: "Commode, Bureau & Armoire",
    specimens: "42 Specimens",
    filterKey: "french",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvN08a0MBW1IdHp7hkmM-Q5FASnsVdE-nAJKP9IFIzro5UAXPudmtmEVemCj01D48G1NwmDPOS22eXzXb6W3o4gFPZJT6QnRqEooN33dllLCkQvTZD7EhsziEQtmhK2LSVqF25gLPRu5CqzscscihwKPE4bqK6Vtk02A1nX05-Uy1Fw_Ao1vClOwhgftvZusYW0fAvRykAW1rgxxEfGKI7kVd4Nq1VSFEnh2-Lh5mB5P1suyC4XtQZ",
    imageAlt: "French 18th-century antique bureau plat writing desk",
  },
  {
    id: "lighting",
    title: "조명 & 샹들리에",
    subtitle: "Gilt Bronze & Crystal Sconces",
    specimens: "28 Specimens",
    filterKey: "lighting",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCplZPfLiw6JwBjjXvAbtXI5yI-GND6N3gXQz1y7j1WRenx0k8m7AJ4GW7YDAgeIiSsDFiDnQO6vCUptm4Tbcnxg6H3Kx5eLARV-9NJVRXIcc-__HFp9Hc3v-zLtALP1s3yzPzpBqhNZGADxFowQ3BDB2wSVhmMB5EQUc-5PuzrneFaRX5B0bTPLisvxhZ3hQHfL1_0aD7aFCyPVqcg17cGuH54hPHIFbDP6mCCIS-HuadaB5m7fAJf",
    imageAlt: "Antique French gilt bronze ormolu chandelier and sconces",
  },
  {
    id: "mirrors",
    title: "길트 거울 & 벽장식",
    subtitle: "Rococo Gilded Pier Mirrors",
    specimens: "19 Specimens",
    filterKey: "french",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCTk0OQzR8woSzKTkTVc1eR62c-oeezOxMaDrFUq8inDZcy06mk13OTm6EALnUQcJGeiixGTo1wjJ89ftjDBAFUtMTJOiYcxEONLCB2RNaZdTppVyc7MkG3CuwAvPFFY7soQgt_7W3075CG-4_YPUv-BDAzGuVlteRxT0NwiUm7qJtnqlOUo6SYsMvxFer2t38O2R1190hP4taBWTGbO8xObRzX8lGB8dJ6qK211_hPiu3Y1qxg6Djk",
    imageAlt: "19th-century French Rococo gold gilded pier mirror",
  },
  {
    id: "objects",
    title: "도자기 & 은제 오브제",
    subtitle: "Sèvres & Sterling Tableware",
    specimens: "54 Specimens",
    filterKey: "objects",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAagFjW4WMJl-jQw3TlVEXG3gf6hZ4yVCd1gs5Q-Vp4_INodSyQ7VmghY5tulqu9xSMc0ceylYJ8hhV5BLjbHSFLkfRHPvupB4pZlyOPGjJYIgVzL6VX6AwCAEZZYl5siIYYsCnDr2R7z6vjXzapqKwi3EPrmKIJjEi17X8CdlDsFUrouvOAniazs47-U6aM6HeyOSAQPWkQB8QeXZSmLbfGO7Wsqf8mDMDSltTdw0Lm38KYEbPbZk0",
    imageAlt: "Antique Sèvres porcelain vase and sterling silverware",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "MDA-1870-FAUT",
    name: "나폴레옹 3세 에메랄드 벨벳 파퇴유",
    enName: "Carved Walnut & Lyon Silk Velvet Fauteuil",
    period: "Napoléon III Period",
    category: "french",
    originEra: "프랑스 파리, 1870년대 나폴레옹 3세 제2제정기",
    materials: "프렌치 솔리드 월넛, 리옹 오리지널 실크 벨벳",
    dimensions: "W 68 × D 72 × H 98 cm",
    price: 5200000,
    formattedPrice: "₩ 5,200,000",
    tag1: "France, 1870s",
    tag2: "Only 1 Available",
    refCode: "MDA-1870-FAUT",
    provenanceDeed:
      "파리 16구 사립 저택 소장품 출품. 오리지널 하부 스프링과 마총 충전재를 보존한 채 표면 벨벳 클리닝 완료.",
    description:
      "프랑스 제2제정기의 화려하면서도 안락한 살롱 문화를 상징하는 암체어. 리옹산 실크 벨벳의 에메랄드 그린 빛깔과 흑단에 가까운 파티나를 머금은 프렌치 월넛의 조각 디테일이 돋보입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbUOvRAUdEMuAh3CVPCFvzlbaiqLMMIJ7oZNFab_f4gd7ZNEov6v4MIOs7l3sZTQ9uDBdXZRwi0YXlJkcsaGnFo_KuAq59FKjRnl6FnG0pcb5BhZcfh3gIVm5lNkJiRT_7BOK6PklC1gdQHH-irC0jysPeE9WRTmQkJQLadyUoYrOoRq8sJZA_6RxIY6gElWy-43NZTIQvtXRryWZjMyfKB-Yws_jKNZk3CqrpvenRft3zd1PodfvE",
    imageAlt: "나폴레옹 3세 에메랄드 벨벳 파퇴유",
  },
  {
    id: "MDA-1790-APPL",
    name: "디렉투아르 길트 브론즈 촛대형 브라켓 (1조)",
    enName: "Pair of Hand-Chased Ormolu Wall Appliques",
    period: "Directoire Era",
    category: "lighting",
    originEra: "프랑스 파리, 1790년대 디렉투아르 총재정부기",
    materials: "수작업 정밀 타출 오르몰루 길트 브론즈 (순금 도금)",
    dimensions: "W 24 × D 16 × H 42 cm",
    price: 7800000,
    formattedPrice: "₩ 7,800,000",
    tag1: "France, c. 1790",
    tag2: "Pair Specimen",
    refCode: "MDA-1790-APPL",
    provenanceDeed:
      "남프랑스 생제르맹 귀족 살롱 벽면 장식 1조 완벽 보존. 국내 규격 220V 촛대 전구 호환 소켓 보존형 배선 개조 완료.",
    description:
      "프랑스 혁명 직후 디렉투아르 양식의 절제된 고전주의 미학을 담은 벽부등 브라켓 1조. 순금 수은 아말감 도금 특유의 깊은 광택과 섬세한 월계수 잎 문양이 아름답습니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAXaEgdx_GjD_Tb-Qgf8a1YfzpZTd_rV_hDr9r1Iu_2rcDfoABUG0ILdjTafM98Y04_EoeiVVK0h2Ezvcb5fG7Wrw1ciGDQ5auC3N4-ZXocCxIp6VE5s1zrbEkonswNXh-ssf1aEbhrHr9pPztGyYzIfCVMDplGD_gahZQFlPEV1q-ZB5k6chrMluRQqKrd_suyZ47PuhNF5TOvkY-xef8QvfLl4mf_Da0B3or-kVaZt_r-lEBi8y8N",
    imageAlt: "디렉투아르 길트 브론즈 촛대형 브라켓 (1조)",
  },
  {
    id: "MDA-1880-DESK",
    name: "빅토리안 버 월넛 트윈 페데스탈 데스크",
    enName: "Burr Walnut & Gilt-Tooled Forest Leather Top",
    period: "Victorian Era",
    category: "british",
    originEra: "영국 런던 메이페어 공방, 1880년대 빅토리아 시대",
    materials: "버 월넛(Burr Walnut) 무늬목, 올리브그린 골드 툴링 가죽",
    dimensions: "W 137 × D 76 × H 78 cm",
    price: 12400000,
    formattedPrice: "₩ 12,400,000",
    tag1: "England, 1880s",
    tag2: "Certified Origin",
    refCode: "MDA-1880-DESK",
    provenanceDeed:
      "영국 서리 카운티 변호사 집무실 3대 세습 전승품. 전통 영국 앤틱 가구 감정 협회(BADA) 정품 실링 부착.",
    description:
      "빅토리아 시대 특유의 버 월넛 나무혹 무늬가 대칭으로 펼쳐진 트윈 페데스탈 서재 책상. 상판에는 금박 롤러로 음각된 숲빛 가죽 패드가 정갈하게 유지되어 있습니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDs4ZRLHL6UcEyGIwgrNSjS8vbWMxFa0iJNnk8vA1_Vd1yAgfDHosfqKAQIPmRuvjcWfIB6rEuE-JRhYVTnfEke1fnSNG9JkKeQHd3Ya1JwZhj59Vl3ELXlBvM3SsqXQXzVWX642ax4aw01Yaj5pCGMDQ6c0ODyI7WgLEeic2ZuMXXyFTGDdFT4caHFkkLS1TGHnV62CX27OKWeyDNX2X9CPtuwqBvdMrbKFwIEdkehMWlM0Nf2Mldb",
    imageAlt: "빅토리안 버 월넛 트윈 페데스탈 데스크",
  },
  {
    id: "MDA-1840-MIRO",
    name: "루이 필립 길트 리프 오리지널 수은 거울",
    enName: "Carved Wood, Gold Leaf Gesso & Mercury Plate",
    period: "Louis Philippe",
    category: "french",
    originEra: "프랑스 루앙, 1840년대 루이 필립 치세",
    materials: "수제 목조각, 석고 제소 베이스 순금박, 오리지널 수은 미러",
    dimensions: "W 82 × H 124 cm",
    price: 6400000,
    formattedPrice: "₩ 6,400,000",
    tag1: "France, 1840s",
    tag2: "Original Mercury Glass",
    refCode: "MDA-1840-MIRO",
    provenanceDeed:
      "1840년대 노르망디 부르주아 저택 콘솔 위 배치 기록 확인. 뒷면 원목 백패널 및 수은 결정체 은하수 반점 원형 보존.",
    description:
      "둥근 상단 모서리와 정교한 진주 비딩 문양이 특징인 루이 필립 시대 거울. 백 년이 넘는 세월에 걸쳐 형성된 수은 유리 특유의 몽환적인 반사와 금박의 세월감이 감탄을 자아냅니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2yA6QhaoSVmbkR4BfOUae3GQ_eoUh50iI_unQBihipJ2UfkcHtjb58bPM36ZuRKm-gxneTT5hNkbE52WwqkPdY80Xa2Iu0rLVEjE5yLGUGnpce7fmjepvny8sbq4JLuSaXTrBP660uM2Bxu5sDAZuelscdaK2UbOmd1HSHSYFKrAivci_BwpwVejVSo8p-86FyLvIXY5JKlROtAnOyNJVpt9IimwT-QmwByhNROYBZ8TDCoklQW6Q",
    imageAlt: "루이 필립 길트 리프 오리지널 수은 거울",
  },
  {
    id: "MDA-1880-MEIS",
    name: "마이센 핸드페인팅 플로럴 길트 센터피스",
    enName: "Polychrome Enamel & Burnished Gold Porcelain",
    period: "Meissen Atelier",
    category: "objects",
    originEra: "독일 마이센 공방, 1880년대 경",
    materials: "경질 자기(Hard-paste porcelain), 다채 유약, 번니싱 골드",
    dimensions: "Diameter 32 × H 14 cm",
    price: 3900000,
    formattedPrice: "₩ 3,900,000",
    tag1: "Germany, c. 1880",
    tag2: "Crossed Swords Mark",
    refCode: "MDA-1880-MEIS",
    provenanceDeed:
      "하단 청화 교차 검(Crossed Swords) 백마크 정품 인증. 금채 박리 없는 최상급 민트 컨디션.",
    description:
      "유럽 자기의 자존심 독일 마이센의 19세기 대표작. 테두리의 오픈워크 격자 투조 세공과 중앙에 손으로 붓터치한 야생화 부케, 번니싱 기법의 순금 채색이 우아한 테이블 장식을 완성합니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBHUlYL9sWrmNHPndJ5npri_DHkyrqFI_LrqUIvQJMXwG3rCG7ujK4VKiovWJngNff81hfMZvHVLp2PWUQf-vPOTt3VqnkeXR8xsWLYZ1BheMr6UVrGl6OXjEU_WF39uTnXAEJ7aXn-C6YFm8eUxZbtQhq5F-g62DjjjDBKAUbK8ss69C7LgPqcBNPP1UvSwQf-Bdjiadp0odvOhJVvaphxJKiUq2eLSwZ8gDVGaw2_H89hf5E90LDR",
    imageAlt: "마이센 핸드페인팅 플로럴 길트 센터피스",
  },
  {
    id: "MDA-1815-CELL",
    name: "리젠시 플레임 마호가니 와인 셀러렛",
    enName: "Flame Mahogany with Original Lead Lining",
    period: "Regency Period",
    category: "british",
    originEra: "영국 에든버러, 1815년 워털루 전쟁 전후",
    materials: "쿠바산 플레임 마호가니, 납 내부 라이닝, 사자머리 황동 핸들",
    dimensions: "W 64 × D 48 × H 56 cm",
    price: 8900000,
    formattedPrice: "₩ 8,900,000",
    tag1: "England, 1815",
    tag2: "Regency Era",
    refCode: "MDA-1815-CELL",
    provenanceDeed:
      "스코틀랜드 헤리티지 트러스트 등록 고택 다이닝룸 전승품. 내부 원형 납 차폐조 및 오리지널 황동 캐스터 보존.",
    description:
      "귀족들의 디너 파티에서 차가운 와인을 서빙하기 위해 제작된 리젠시 양식의 셀러렛. 불꽃이 피어오르는 듯한 플레임 마호가니 결의 농밀함과 절제된 사브르 레그 라인이 탁월합니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3oY5QtX_zzK91YsgZAOZOHqZFEhJ1cXK3qqzPAx2r-vjfYstGYXQLz7eEeZcSLgC-FEznXaHRxgw4PPQ_f4vZbjw7XiNGYVEfX5WzRxsnvigixaQdrQ3XD9o8GNm5kaM1FfbniMSwbWlBPZB9RwLoADEr0eYYkaF4ocL4OJAInfghRZUgljCgto6e9Nx3C0_rdtR7sj6m2sTvYfrtd5Awg5YYPgoEId8g0lekpf6MrAASHB7tYN32",
    imageAlt: "리젠시 플레임 마호가니 와인 셀러렛",
  },
  // Additional specimens for "전체 84개 작품 더보기"
  {
    id: "MDA-1760-BUREAU",
    name: "루이 15세 로코코 뷔로 플라 (서재 집무 책상)",
    enName: "French Louis XV Kingwood & Tulipwood Parquetry Bureau Plat",
    period: "Louis XV Mid 18th-C.",
    category: "french",
    originEra: "프랑스 파리 가구장인 마르탱 길드, 1760년대",
    materials: "킹우드 & 튤립우드 파케트리, 오르몰루 길트 브론즈",
    dimensions: "W 145 × D 80 × H 79 cm",
    price: 32000000,
    formattedPrice: "₩ 32,000,000",
    tag1: "France, c. 1760",
    tag2: "Museum Quality",
    refCode: "MDA-1760-BUREAU",
    provenanceDeed:
      "프랑스 루아르 밸리 샤토 드 빌랑드리 인근 고성 소장. 장인 공방 각인(JME 타각) 보존.",
    description:
      "기하학적 무늬로 얇은 원목을 모자이크하듯 상감한 파케트리 기법과 우아한 카브리올레 레그가 감탄을 자아내는 로코코 서재용 집무 책상입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvN08a0MBW1IdHp7hkmM-Q5FASnsVdE-nAJKP9IFIzro5UAXPudmtmEVemCj01D48G1NwmDPOS22eXzXb6W3o4gFPZJT6QnRqEooN33dllLCkQvTZD7EhsziEQtmhK2LSVqF25gLPRu5CqzscscihwKPE4bqK6Vtk02A1nX05-Uy1Fw_Ao1vClOwhgftvZusYW0fAvRykAW1rgxxEfGKI7kVd4Nq1VSFEnh2-Lh5mB5P1suyC4XtQZ",
    imageAlt: "루이 15세 로코코 뷔로 플라",
  },
  {
    id: "MDA-1860-CHAND",
    name: "프렌치 오르몰루 & 바카라 크리스탈 8등 샹들리에",
    enName: "French Gilt Bronze & Cut Crystal 8-Light Salon Chandelier",
    period: "Napoleon III, c. 1860",
    category: "lighting",
    originEra: "프랑스 파리, 1860년대",
    materials: "오르몰루 길트 브론즈 프레임, 핸드컷 프리즘 크리스탈",
    dimensions: "Diameter 75 × H 95 cm",
    price: 15800000,
    formattedPrice: "₩ 15,800,000",
    tag1: "France, 1860s",
    tag2: "Complete Prisms",
    refCode: "MDA-1860-CHAND",
    provenanceDeed:
      "파리 오스만대로 레지던스 메인 살롱 천장 철거 소장품. 크리스탈 프리즘 단 한 점의 유실 없이 보존.",
    description:
      "빛을 굴절시키는 섬세한 크리스탈 프리즘 드롭과 중후한 길트 브론즈 암이 만들어내는 클래식한 조명의 정점.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCplZPfLiw6JwBjjXvAbtXI5yI-GND6N3gXQz1y7j1WRenx0k8m7AJ4GW7YDAgeIiSsDFiDnQO6vCUptm4Tbcnxg6H3Kx5eLARV-9NJVRXIcc-__HFp9Hc3v-zLtALP1s3yzPzpBqhNZGADxFowQ3BDB2wSVhmMB5EQUc-5PuzrneFaRX5B0bTPLisvxhZ3hQHfL1_0aD7aFCyPVqcg17cGuH54hPHIFbDP6mCCIS-HuadaB5m7fAJf",
    imageAlt: "프렌치 오르몰루 & 바카라 크리스탈 샹들리에",
  },
  {
    id: "MDA-1850-SEVR",
    name: "세브르 왕립 도자기 공방 길트 핸들 우른 화병",
    enName: "Sèvres Royal Porcelain Ormolu-Mounted Gilt Urn",
    period: "Sèvres, c. 1850",
    category: "objects",
    originEra: "프랑스 세브르 왕립 공방, 1850년대",
    materials: "코발트 블루 유약 자기, 24K 길트 오르몰루 마운트",
    dimensions: "W 26 × D 20 × H 48 cm",
    price: 9400000,
    formattedPrice: "₩ 9,400,000",
    tag1: "France, c. 1850",
    tag2: "Royal Sèvres Mark",
    refCode: "MDA-1850-SEVR",
    provenanceDeed:
      "하단 세브르 인터트와인드 Ls 마크 및 페인터 서명 확인. 루브르 인근 고서 갤러리 소장 이력.",
    description:
      "깊은 밤하늘을 연상시키는 블뢰 드 루아(Bleu de Roi) 코발트 컬러 위에 궁정 연인들의 정경을 섬세하게 담아낸 마스터피스입니다.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAagFjW4WMJl-jQw3TlVEXG3gf6hZ4yVCd1gs5Q-Vp4_INodSyQ7VmghY5tulqu9xSMc0ceylYJ8hhV5BLjbHSFLkfRHPvupB4pZlyOPGjJYIgVzL6VX6AwCAEZZYl5siIYYsCnDr2R7z6vjXzapqKwi3EPrmKIJjEi17X8CdlDsFUrouvOAniazs47-U6aM6HeyOSAQPWkQB8QeXZSmLbfGO7Wsqf8mDMDSltTdw0Lm38KYEbPbZk0",
    imageAlt: "세브르 왕립 도자기 공방 길트 핸들 우른 화병",
  },
];

export const RESIDENCE_STORIES: ResidenceStory[] = [
  {
    id: "story-1",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuColewW_Q_NqCM-0mFTsTxtdVz7dPoonaexbldeHWmvCAwrCCTlGUDlVFtMZLA91951Xywv7Sg5WUrlRf_HCIvQIqNafCOCO_RdanW4t-9ZOxKfDlqnRhZJQAJ3yK8dM7QnOXZka9DWHBtRovqNHx2JgpbP7HrhOTKqENexXvBHqOmKzGDXDJeqUc4k2L1G_olT5OhBSoIMCxsS3h2mVOAxUPAVg56_o-FtLfxNBoxPTi0jFR64Qdk1",
    imageAlt: "Modern minimalist penthouse living room with French Louis XV commode",
    quote:
      "모던한 구조의 신축 펜트하우스에 메종 당티크의 18세기 코모드를 들이자마자 공간의 중심축이 묵직하게 완성되었습니다. 목재의 깊은 결과 황동의 은은한 광택은 그 어떤 현대 가구도 흉내 낼 수 없더군요.",
    clientName: "이서연 건축가",
    clientRole: "건축사사무소 대표",
    projectLocation: "한남동 레지던스 프로젝트",
  },
  {
    id: "story-2",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChHXPQnauZoYsyHp5gOF3OtDJY0TfhU59RQjtbofxIUuephzzgcXEB9dH04k8hSjvKJbrb46TpPW37pQ9914NApoS3U0oL-f90tpC0HpZJrd7j1WdGRKnXeiyymQoeYH3MCRJF7-wuSDB4M-4uE63ceNfRcic9os6H5_42C7XltzlRiPJMVSVFW7Dqx-VAXlj71b8psZnbcJ20NA98qZXyUoyriTGW3c8JE0TKs9rtalvEua6W_RT8",
    imageAlt: "Private law office executive study with Victorian desk",
    quote:
      "빅토리안 버 월넛 데스크는 단순한 집기를 넘어 저의 철학과 업무에 대한 깊은 경외감을 전달합니다. 프랑스와 영국의 검증된 증빙 문서가 함께 전달되어 더욱 신뢰가 갔습니다.",
    clientName: "박준우 대표 변호사",
    clientRole: "법무법인 대표",
    projectLocation: "도곡동 집무실",
  },
  {
    id: "story-3",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDrya97ECPG_SXQ93LT2pVz8qEwDnPF6kztWBlx6swXgU0NTxtxeSSeK49B38GLzYvPJ_pbEsZdG-8k7zvJSk43AeFDysjMGHN1vgeHv3si8ckCOGuFsDKtRne5o390Cz1Oo6eKeVcpSUa4Ls8kBzP5kWvy-1e8xRZV5ZAJMnmK5vqE2nmYBdOJeIQaJpk-rR02uBrWA5B24GEkOzjWCcCt8Nd3mbCe3naloocNA2oh-P4xugTcC2IM",
    imageAlt: "Boutique heritage hotel reception salon with chandelier and pier mirror",
    quote:
      "호텔 로비의 샹들리에와 루이 필립 거울은 투숙객들에게 가장 사랑받는 포토 스팟이 되었습니다. 화이트글러브 운송부터 설치까지 세심하게 관리해 주신 아틀리에 팀에 깊이 감사드립니다.",
    clientName: "클라우드 앤 부티크 호텔",
    clientRole: "총지배인 M. Laurent",
    projectLocation: "서울 종로 부티크 호텔",
  },
];
