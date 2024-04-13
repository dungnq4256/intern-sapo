import { AuthContext } from "AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppButton from "../AppButton";
import DialogModal from "../DialogModal";

Header.propTypes = {};

function Header(props) {
    const navigate = useNavigate();
    const { logout, user } = useContext(AuthContext);
    const [showLogOutModal, setShowLogOutModal] = useState(false);

    const handleSignOut = () => {
        logout();
        // UserHelper.signOut();
        // removeAxiosAccessToken();
        // navigate("/sign-in");
    };

    return (
        <div className="container-xxl d-flex justtify-content-end align-items-center sticky-top shadow-sm px-5 py-3 bg-body">
            <div className="d-flex flex-fill fw-bold fs-4 text-uppercase justify-content-center mx-5">
                XIN CHÀO {user}
            </div>
            <AppButton
                width="9rem"
                height="2.5rem"
                className="btn-blue"
                text="Đăng xuất"
                onClick={() => setShowLogOutModal(true)}
            />
            <DialogModal
                show={showLogOutModal}
                onClose={() => setShowLogOutModal(false)}
                title="Đăng xuất"
                icon="fa-solid fa-right-from-bracket text-primary"
                description="Bạn có chắc chắn muốn đăng xuất?"
                onExecute={handleSignOut}
                textBtnCancel="Hủy"
                textBtnExecute="Xác nhận"
            />
        </div>
    );
}

export default Header;
