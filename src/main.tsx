ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
)
