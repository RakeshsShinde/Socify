import { combineReducers } from '@reduxjs/toolkit'
import loginReducer from './UserReducers/LoginSlice';
import registerReducer from './UserReducers/RegisterSlice';
import deleteUserReducer from './UserReducers/deleteUserSlice';
import followUserReducer from './UserReducers/followUserSlice';
import newpostReducer from './PostReducers/NewPostSlice';
import likePostReducer from './PostReducers/LikePostSlice';
import postsReducer from './PostReducers/PostsSlice';
import singlePostReducer from './PostReducers/SinglepostSlice';
import editPostReducer from './PostReducers/EditpostSlice';
import deletePostReducer from './PostReducers/DeletePostSlice';
import savePostReducer from './PostReducers/SavePostSlice';
import newCommentReducer from './CommentReducers/newCommentSlice';
import likeCommentReducer from './CommentReducers/CommentLikeSlice';
import deleteCommentReducer from './CommentReducers/DeleteCommentSlice';
import replayLikeReducer from './CommentReducers/likeReplaySlice';
import replayCommentReducer from './CommentReducers/ReplaySlice';
import deleteReplayReducer from './CommentReducers/DeleteReplaySlice';
import suggestionSlice from './UserReducers/SuggestionSlice';
import trendingTagsReducer from './PostReducers/TrendingTagsSlice';
import forgotPasswordReducer from './UserReducers/forgotPassSlice';
import resetPasswordReducer from './UserReducers/resetPasswordSlice';
import searchUserReducer from './UserReducers/searchUserSlice';
import editUserReducer from './UserReducers/editProfileSlice';
import userProfileReducer from './UserReducers/userProfileSlice';
import PostsbyTagNLocationSlice from './PostReducers/PostsbyTagNLocationSlice';
import Chatreducer from '../reducers/chatreducers/chatSlice'
import newGroupReducer from '../reducers/chatreducers/createGroupSlice'
import updateGroupreducer from '../reducers/chatreducers/updateProfileSlice'
import AddNRemoveUsers from '../reducers/chatreducers/addNRemoveUsersSlice';
import singleMessageReducer from '../reducers/messageReducers/singleMessageSlice';
import MessagesReducer from '../reducers/messageReducers/messagesSlice';
import NotificationReducer from '../reducers/notificationReducer/notificationSlice';
import NewNotification from '../reducers/notificationReducer/NewNotification';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    Login: loginReducer,
    Register: registerReducer,
    NewPost: newpostReducer,
    Posts: postsReducer,
    LikePost: likePostReducer,
    EditPost: editPostReducer,
    DeletePost: deletePostReducer,
    NewComment: newCommentReducer,
    LikeComment: likeCommentReducer,
    FollowUser: followUserReducer,
    DeleteUser: deleteUserReducer,
    ReplayTocomment: replayCommentReducer,
    DeleteComment: deleteCommentReducer,
    SuggestUsers: suggestionSlice,
    ForgotPassword: forgotPasswordReducer,
    ResetPassword: resetPasswordReducer,
    Edituser: editUserReducer,
    SinglePost: singlePostReducer,
    LikeReplay: replayLikeReducer,
    DeleteReplay: deleteReplayReducer,
    SearchUser: searchUserReducer,
    SavePost: savePostReducer,
    UserProfile: userProfileReducer,
    PostsByTagNLocation: PostsbyTagNLocationSlice,
    TrendingTags: trendingTagsReducer,
    Chats: Chatreducer,
    NewGroup: newGroupReducer,
    UpdateGroup: updateGroupreducer,
    AddNRemoveUsers: AddNRemoveUsers,
    SingleMessage: singleMessageReducer,
    Messages: MessagesReducer,
    Notifications: NotificationReducer,
    NewNotification: NewNotification,
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;