import { createContext, useCallback, useState, useContext, FC } from 'react';
import { IProfile } from '../pages/ProfileSelector/models';

interface ProfileContextData {
  profile: IProfile;
  updateProfile(profile: IProfile): void;
}

const ProfileContext = createContext<ProfileContextData>({} as ProfileContextData);

const ProfileProvider: FC = ({ children }) => {
  const [profileState, setProfileState] = useState({} as IProfile);

  const updateProfile = useCallback(
    (profile: IProfile) => {
      setProfileState(profile);
    },
    [setProfileState],
  );

  return (
    <ProfileContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ profile: profileState, updateProfile }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

function useProfile(): ProfileContextData {
  const context = useContext(ProfileContext);

  return context;
}

export { ProfileProvider, useProfile };