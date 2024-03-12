import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useUserStoreInformation from "@/Hook/userStoreInformation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Input } from "@/components/ui/input";

export default function Navigation() {
  const setAuthenticatedUser = useUserStoreInformation(
    (state) => state.setAuthenticatedUser
  );

  const authenticatedUser = useUserStoreInformation(
    (state) => state.authenticatedUser
  );

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticatedUser(null);
    navigate("/", { replace: true });
  };
  const search  = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
  }
  return (
    <div className="bg-[#D0B8AC] px-6 py-3 ">
      <Menubar className="border-none justify-end  ">
        <MenubarMenu className="mr-5">
          <MenubarTrigger>
            <svg
              width="25"
              height="37"
              viewBox="0 0 41 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.2376 16.7178C21.5718 16.7178 22.876 16.3612 23.9854 15.6932C25.0947 15.0253 25.9593 14.0758 26.4699 12.965C26.9805 11.8542 27.1141 10.6318 26.8538 9.45259C26.5935 8.27334 25.951 7.19013 25.0076 6.33994C24.0642 5.48975 22.8622 4.91077 21.5536 4.6762C20.245 4.44163 18.8887 4.56202 17.656 5.02214C16.4234 5.48226 15.3698 6.26145 14.6286 7.26116C13.8873 8.26088 13.4917 9.43623 13.4917 10.6386C13.4917 12.2509 14.2024 13.7971 15.4675 14.9372C16.7326 16.0773 18.4484 16.7178 20.2376 16.7178Z"
                fill="#493548"
              />
              <path
                d="M30.3564 31.9157C30.8037 31.9157 31.2326 31.7556 31.5489 31.4706C31.8652 31.1856 32.0429 30.799 32.0429 30.3959C32.0429 27.5744 30.7991 24.8684 28.5852 22.8733C26.3713 20.8782 23.3686 19.7574 20.2376 19.7574C17.1067 19.7574 14.104 20.8782 11.8901 22.8733C9.67614 24.8684 8.43237 27.5744 8.43237 30.3959C8.43237 30.799 8.61005 31.1856 8.92633 31.4706C9.2426 31.7556 9.67156 31.9157 10.1188 31.9157H30.3564Z"
                fill="#493548"
              />
            </svg>
            {authenticatedUser?.name}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="14"
                height="14"
                transform="translate(0.317383 0.457123) rotate(-0.57145)"
                fill="#D0B8AC"
              />
              <path
                d="M12.8693 5.89174L8.5382 10.3102C8.49797 10.3512 8.45004 10.384 8.39716 10.4065C8.34427 10.4291 8.28745 10.441 8.22996 10.4416C8.17247 10.4421 8.11543 10.4314 8.0621 10.4099C8.00877 10.3884 7.9602 10.3566 7.91916 10.3163L3.50075 5.98519C3.43889 5.92461 3.39639 5.84705 3.37863 5.76231C3.36088 5.67757 3.36866 5.58947 3.401 5.50915C3.43335 5.42884 3.48879 5.35993 3.56032 5.31115C3.63184 5.26237 3.71624 5.2359 3.80281 5.2351L12.5524 5.14784C12.639 5.1469 12.7239 5.17168 12.7963 5.21903C12.8688 5.26638 12.9256 5.33417 12.9596 5.41382C12.9935 5.49347 13.0031 5.5814 12.987 5.66647C12.9709 5.75155 12.93 5.82995 12.8693 5.89174Z"
                fill="#493548"
              />
            </svg>
          </MenubarTrigger>
          <MenubarContent className="bg-white mr-5">
            <MenubarItem className="px-8">
              <Button onClick={logout}>Logout</Button>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <div className="flex w-full items-center justify-between ">
        <div className="flex w-[100%] items-center ">
          <div className="logo text-2xl ">iRent</div>
          <form
            onSubmit={search}
            className=" w-[70%] items-center bg-white rounded-md mx-3  flex h-10"
          >
            <div className="h-[86%] flex justify-center items-center px-5 rounded-md ml-1 bg-[#EFE5DC]">
              <svg
                width="15"
                height="21"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.9229 18.894L16.6623 14.2482C18.187 12.6313 18.9473 10.5574 18.7851 8.45788C18.6228 6.3584 17.5504 4.395 15.791 2.97612C14.0316 1.55724 11.7207 0.79213 9.33889 0.839943C6.95711 0.887756 4.68789 1.74481 3.00329 3.23283C1.31868 4.72084 0.348392 6.72525 0.294262 8.82907C0.240133 10.9329 1.10633 12.9742 2.71266 14.5282C4.319 16.0823 6.54179 17.0296 8.91865 17.1729C11.2955 17.3162 13.6434 16.6447 15.474 15.2978L20.7336 19.9446C20.8117 20.0136 20.9044 20.0683 21.0064 20.1056C21.1085 20.1429 21.2178 20.1622 21.3283 20.1622C21.4387 20.1622 21.5481 20.1429 21.6501 20.1056C21.7521 20.0683 21.8448 20.0136 21.9229 19.9446C22.001 19.8756 22.063 19.7937 22.1052 19.7036C22.1475 19.6135 22.1692 19.5169 22.1692 19.4193C22.1692 19.3217 22.1475 19.2252 22.1052 19.135C22.063 19.0449 22.001 18.963 21.9229 18.894ZM1.99615 9.02516C1.99615 7.7036 2.43981 6.41171 3.27103 5.31287C4.10226 4.21403 5.28371 3.35759 6.66598 2.85185C8.04826 2.34611 9.56927 2.21379 11.0367 2.47161C12.5041 2.72944 13.852 3.36583 14.91 4.30032C15.9679 5.2348 16.6884 6.42541 16.9803 7.72158C17.2722 9.01775 17.1223 10.3613 16.5498 11.5822C15.9772 12.8032 15.0076 13.8468 13.7636 14.581C12.5196 15.3152 11.057 15.7071 9.56088 15.7071C7.55527 15.7051 5.63244 15.0005 4.21426 13.7478C2.79608 12.4952 1.99837 10.7967 1.99615 9.02516Z"
                  fill="#493548"
                />
              </svg>
            </div>
            <Input
              placeholder="Search Item"
              className="px-3 border-none h-full"
            />
          </form>
        </div>
        <div className="flex space-x-2">
          <svg
            width="32"
            height="33"
            viewBox="0 0 40 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.92663 4.49248C7.29793 4.49465 7.6588 4.59789 7.94916 4.785C8.23952 4.97211 8.44186 5.23181 8.52248 5.52086C9.18702 7.84545 10.7376 9.95909 12.9613 11.5715C15.1849 13.1839 17.9727 14.216 20.9415 14.5261L20.9835 13.08C20.9969 12.6277 21.1778 12.1905 21.5037 11.823C21.8296 11.4555 22.2859 11.174 22.8154 11.0139C23.3902 10.8226 24.0245 10.7682 24.642 10.8572C25.2595 10.9461 25.8339 11.1747 26.2961 11.5155L34.35 17.4478C34.6589 17.6703 34.9044 17.9428 35.0693 18.2466C35.2342 18.5503 35.3147 18.878 35.3051 19.2071C35.2956 19.5361 35.1962 19.8586 35.014 20.1523C34.8317 20.446 34.5709 20.7038 34.2496 20.908L25.8649 26.3763C25.3774 26.6952 24.781 26.8921 24.1496 26.9426C23.5183 26.9932 22.8796 26.8953 22.3127 26.6609C21.7933 26.4704 21.3541 26.163 21.0501 25.7772C20.7461 25.3914 20.5908 24.9444 20.6036 24.4921L20.6475 22.9815C16.2433 22.5824 12.1652 20.8869 9.21765 18.2298C6.27016 15.5727 4.66744 12.1468 4.72576 8.62831C4.75944 7.54443 4.95986 6.46968 5.32258 5.42802C5.41982 5.14413 5.63687 4.8966 5.93759 4.72664C6.23831 4.55667 6.60456 4.47454 6.97536 4.49389L6.92663 4.49248ZM22.4403 17.2186C19.6838 17.1549 16.9741 16.5883 14.5204 15.5627C12.0668 14.537 9.93501 13.0796 8.28969 11.3032C9.03031 13.8442 10.8176 16.1258 13.3659 17.7832C15.9141 19.4407 19.0762 20.3784 22.3467 20.4464C22.7775 20.4589 23.1867 20.6069 23.4843 20.8579C23.7819 21.1088 23.9435 21.4422 23.9336 21.7846L23.8616 24.2636L31.847 19.1068L24.1755 13.444L24.1006 16.0262C24.0742 16.3591 23.8865 16.6692 23.577 16.8915C23.2674 17.1138 22.8601 17.231 22.4403 17.2186Z"
              fill="#493548"
            />
          </svg>
          <svg
            width="32"
            height="31"
            viewBox="0 0 40 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M33.2989 27.125C32.9277 27.1336 32.564 27.0409 32.2683 26.8623C31.9727 26.6836 31.7629 26.4299 31.6739 26.1433C30.9422 23.839 29.331 21.7712 27.0615 20.224C24.792 18.6767 21.9755 17.7259 18.9989 17.5021V18.9488C18.9986 19.4012 18.8304 19.8435 18.5154 20.2203C18.2003 20.5972 17.7524 20.8917 17.2277 21.0671C16.6587 21.275 16.0262 21.3478 15.4064 21.2768C14.7866 21.2057 14.2058 20.9939 13.7339 20.6667L5.51141 14.9704C5.1961 14.757 4.94287 14.4917 4.76921 14.1929C4.59555 13.894 4.50562 13.5688 4.50562 13.2396C4.50562 12.9104 4.59555 12.5852 4.76921 12.2863C4.94287 11.9875 5.1961 11.7222 5.51141 11.5088L13.7339 5.79959C14.212 5.46674 14.8024 5.25263 15.4321 5.18376C16.0617 5.11489 16.7029 5.19427 17.2764 5.41209C17.8011 5.58747 18.249 5.88202 18.5641 6.25883C18.8792 6.63564 19.0474 7.07797 19.0477 7.53042V9.04167C23.4615 9.31293 27.5871 10.8894 30.6105 13.4599C33.6338 16.0304 35.3352 19.4083 35.3789 22.9271C35.3767 24.0115 35.2075 25.0916 34.8752 26.1433C34.7862 26.4299 34.5764 26.6836 34.2807 26.8623C33.9851 27.0409 33.6214 27.1336 33.2502 27.125H33.2989ZM17.4227 14.8542C20.1799 14.8379 22.9049 15.3256 25.3872 16.2797C27.8696 17.2338 30.0428 18.6287 31.7389 20.3567C30.9249 17.8383 29.0722 15.6095 26.4769 14.0266C23.8817 12.4437 20.6937 11.5981 17.4227 11.625C16.9917 11.625 16.5784 11.4889 16.2736 11.2467C15.9689 11.0044 15.7977 10.6759 15.7977 10.3333V7.85334L7.96516 13.2396L15.7977 18.6775V16.0942C15.8145 15.7606 15.993 15.4452 16.296 15.214C16.5989 14.9829 17.0027 14.8539 17.4227 14.8542Z"
              fill="#493548"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
