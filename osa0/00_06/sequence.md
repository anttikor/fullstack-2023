sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server->>browser: {"message":"note created"}
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    browser-->>browser: Update input to the end of the list

    Note right of browser: The browser executes the callback function that renders the notes         