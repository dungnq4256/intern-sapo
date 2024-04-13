import { AuthProvider } from "AuthContext";
import GuestRoute from "general/components/AppRoutes/GuestRoute";
import PrivateRoute from "general/components/AppRoutes/PrivateRoute";
import AppToast from "general/components/AppToast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoryListScreen from "screens/CategoryListScreen";
import InventoryListScreen from "screens/InventoryListScreen";
import ProductListScreen from "screens/ProductListScreen";
import SignIn from "screens/SignInScreen";
import SignUp from "screens/SignUp";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <CategoryListScreen />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/category"
                        element={
                            <PrivateRoute>
                                <CategoryListScreen />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/inventory"
                        element={
                            <PrivateRoute>
                                <InventoryListScreen />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/product"
                        element={
                            <PrivateRoute>
                                <ProductListScreen />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/sign-in"
                        element={
                            <GuestRoute>
                                <SignIn />
                            </GuestRoute>
                        }
                    />
                    <Route
                        path="/sign-up"
                        element={
                            <GuestRoute>
                                <SignUp />
                            </GuestRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <AppToast />
        </AuthProvider>
    );
}

export default App;
