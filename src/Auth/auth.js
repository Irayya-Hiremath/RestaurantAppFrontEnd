import { readAsync } from "@/lib/windows/utils";
export const checkAuth = async (router,redirectToRestaurants ) => {

    const isAuth = await readAsync('userData');
    if (!isAuth) {
      router.push("/");
    } else if (redirectToRestaurants) {
        router.push('/restaurants/listRestaurants');
      
    }
  };