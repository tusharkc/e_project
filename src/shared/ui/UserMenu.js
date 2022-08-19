import { CloseIconTransperent } from './Icons';

import { ForwardIcon } from './Icons';

export default function UserMenu({ user, logout, SetIsDrawerOpen }) {
  return (
    <div className="user-menu overflow-hidden">
      <div className="user-information">
        <span className="user-avatar">{user?.name?.split('')[0]}</span>
        <div className="user-title">
          {user?.title} {user?.name}
        </div>
      </div>
      {/* <ul className="user-links user-links-first-section">
        <li className="d-flex justify-content-between align-items-center">
          <a
            className="user-link"
            href={`${process.env.NEXT_PUBLIC_IDENTITY_APP}/profile`}
          >
            My Profile
          </a>
          <ForwardIcon className="icon-12" />
        </li>
      </ul> */}
      <ul className="user-links user-links-first-section">
        {/* <small className="text-grey-400 font-weight-bold user-links-heading">
          Saved
        </small> */}
        {/* <li className="d-flex justify-content-between align-items-center">
          <a
            className="user-link"
            href={`${process.env.NEXT_PUBLIC_IDENTITY_APP}/saved-search`}
          >
            My Saved Search
          </a>
          <ForwardIcon className="icon-12" />
        </li>
        <li className="d-flex justify-content-between align-items-center">
          <a
            className="user-link"
            href={`${process.env.NEXT_PUBLIC_IDENTITY_APP}/orders`}
          >
            My Orders
          </a>
          <ForwardIcon className="icon-12" />
        </li>  */}
        <li className="d-flex justify-content-between align-items-center">
          <span className="user-link" onClick={() => logout()}>
            Logout
          </span>
          <ForwardIcon className="icon-12" />
        </li>
      </ul>
      <span
        className="text-grey-600 user-menu-close-icon mx-auto"
        onClick={() => SetIsDrawerOpen(false)}
      >
        <CloseIconTransperent />
      </span>
    </div>
  );
}
