import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";

import { getPublicLists, getMyLists, getAvatar, getSavedLists } from "../../utils/api";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [publicLists, setPublicLists] = useState([]);
  const [myLists, setMyLists] = useState([]);
  const [savedLists, setSavedLists] = useState([]);

  // first loading the app make checks
  useEffect(() => {
    (async () => {
      let currentUser = localStorage.getItem("listyUser");
      if (currentUser) {
        currentUser = JSON.parse(currentUser);
        setUser(currentUser);
        setIsAuthenticated(true);
        localStorage.setItem("listyUser", JSON.stringify(currentUser));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await refreshPublicLists();
      await refreshMyLists();
      await refreshSavedLists();
    })();
  }, [isAuthenticated]);

  useEffect(() => {
    (async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token) {
        const { avatar } = await getAvatar(token);
        if (avatar && avatar.location) {
          localStorage.setItem("avatar", JSON.stringify(avatar.location));
          setAvatar(avatar.location);
        }
      }
    })();
  }, [user, avatar]);

  // refresh public Lists
  const refreshPublicLists = async () => {
    const publicLists = await getPublicLists();
    setPublicLists(publicLists);
  };

  // refresh private lists
  const refreshMyLists = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    const myLists = await getMyLists(token);
    setMyLists(myLists);
  };

  // refresh saved Lists
  const refreshSavedLists = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    const savedLists = await getSavedLists(token);
    setSavedLists(savedLists);
  };

  // refresh all lists
  const refreshLists = async () => {
    await refreshPublicLists();
    await refreshMyLists();
    await refreshSavedLists();
  };

  const filterPublicLists = async (tag) => {
    if (!tag) {
      return await refreshPublicLists();
    }
    const lists = publicLists.filter((list) => list.tags.includes(tag));
    setPublicLists(lists);
  };

  const filterPrivateLists = async (tag) => {
    if (!tag) {
      return await refreshMyLists();
    }
    const lists = myLists.filter((list) => list.tags.includes(tag));
    setMyLists(lists);
  };

  // logout
  const logout = useCallback(() => {
    localStorage.removeItem("listyUser");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");
    setIsAuthenticated(false);
    setUser(null);
    setAvatar(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        publicLists,
        myLists,
        refreshPublicLists,
        refreshMyLists,
        refreshLists,
        filterPublicLists,
        filterPrivateLists,
        avatar,
        setAvatar,
        savedLists,
        refreshSavedLists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
