const { data, isLoading, totalItem, itemPerPage, showPagination } = useSelector((state: RootState) => state.products);
const { data: brands } = useSelector((state: RootState) => state.brands);
const { data: categoryProduct } = useSelector((state: RootState) => state.categoryProc);
const searchParams = useLocation().search.slice(1);
const dispatch = useAppDispatch();
const navigate = useNavigate();

const [products, setProducts] = useState<Product[]>(data);
const [currentPage, setCurrentPage] = useState<number>(1);
const [sort, setSort] = useState<string>("");
const [price, setPrice] = useState({ value: { min: 0, max: 500 } });
const [selectedBrand, setSelectedBrand] = useState<string>('');
const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

// Combine fetch operations into one useEffect
useEffect(() => {
   dispatch(getAllProducts({}));
   dispatch(getAllBrand());
   dispatch(getAllCategoryProduct());
}, [dispatch]);

useEffect(() => {
   const query = searchParams ? `${searchParams}` : '';
   dispatch(getAllProducts({ page: currentPage, query }));
}, [currentPage, searchParams, dispatch]);

useEffect(() => {
   if (data) setProducts(data);
}, [data]);

const handleActive = useCallback((item: number) => {
   setCurrentPage(item);
}, []);

const handleBrandChange = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
   setSelectedBrand(event.target.value);
}, []);

const handleCategoryChange = useCallback((id: string) => {
   const index = selectedCategories.indexOf(id);
   if (index === -1) {
      setSelectedCategories([...selectedCategories, id]);
   } else {
      const newCategories = [...selectedCategories];
      newCategories.splice(index, 1);
      setSelectedCategories(newCategories);
   }
}, [selectedCategories]);

const handleFilter = useCallback(() => {
   const filteredProducts = data.filter((item) => {
      const brandMatch = selectedBrand ? item.brand === selectedBrand : true;
      const categoryMatch = selectedCategories.length === 0 ||
         selectedCategories.every((category) => item.category.some((cat) => cat.title === category));
      return brandMatch && categoryMatch;
   });
   setProducts(filteredProducts);
}, [data, selectedBrand, selectedCategories]);

const handleSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
   setSort(e.target.value);
   const sortValue = e.target.value;
   if (sortValue) {
      navigate(`/shop?sort=${sortValue}`);
   } else {
      navigate(`/shop`);
   }
}, [navigate]);

// Check for isLoading state right away
if (isLoading) return <Loading isFull />