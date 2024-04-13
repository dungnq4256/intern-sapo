import { AuthContext } from "AuthContext";
import AppButton from "general/components/AppButton";
import BaseTextField from "general/components/BaseForm/BaseTextField";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

SignInScreen.propTypes = {};

function SignInScreen(props) {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        login(username, password);
    };

    return (
        <div className="SignInScreen d-flex min-vh-100 justify-content-center align-items-center bg-secondary">
            <div className="SignInForm">
                <div>
                    <h1 style={{ fontWeight: "600", textAlign: "center" }}>
                        Đăng nhập
                    </h1>
                    <div>
                        <BaseTextField
                            className="mb-3"
                            name="username"
                            placeholder="Nhập tài khoản..."
                            label="Tài khoản"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error="Bạn chưa nhập tài khoản"
                        />
                    </div>
                    <div>
                        <BaseTextField
                            className="mb-3"
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu..."
                            label="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error="Bạn chưa nhập mật khẩu"
                        />
                    </div>
                    <AppButton
                        className="btn-blue mt-5 w-100"
                        text="Đăng nhập"
                        onClick={handleSignIn}
                        disabled={username.length == 0 || password.length == 0}
                    />
                </div>
            </div>
        </div>
    );
}

export default SignInScreen;
