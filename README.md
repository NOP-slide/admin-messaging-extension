## Installation and Testing
- Navigate to chrome://extensions/.
- Enable "Developer mode."
- Click "Load unpacked" and upload the "build" folder.

## Assumptions Made
- Using the Chrome browser.
- Users have basic knowledge of browser extensions.

## Architectural Decisions
- **Modular Structure**: Separation of concerns with dedicated scripts for background processing and options.
- **Asynchronous Storage**: Uses Chrome's storage APIs for persistent data handling.
- **Badge Notifications**: Uses Chrome's action API for user feedback.

## Future Improvements
- Implement offline functionality.
- Add user preferences for message types.
- Enhance UI/UX for the options page.

![image](https://github.com/user-attachments/assets/ac2e8464-63df-42de-bd74-c0d11848d7b5)
