Benvenuti nel mio gestionale per un piccolo negozietto di articoli di tennis!

L'ho chiamato ORION perché, da grande appasionato di astronomia, oltre che di tennis, adoro la costellazione d'Orione e volevo coniugare le due cose!

Per una buona esperienza, prima di partire con la visualizzazione lato browser:

1. Predisporre un db vuoto in postegreSQL ed assicurarsi di sostituire il nome del db creato con quello presente nelle properties di Java.

2. Prima di effettuare il lancio dell'applicazione, è mia buona abitudine con tutti i progetti Spring Boot cliccare con tasto destro sulla cartella dell'intero progetto Java, andare su "Run as..." e scegliere l'opzione "Maven clean" e, dopo che è terminato, fare "Maven Install". Facendo così, setta correttamente ogni opzione Maven.

3. Successivamente, cliccare di nuovo con tasto destro sulla cartella dell'intero progetto Java, andare su "Run as..." e scegliere l'opzione "Spring Boot application". Si effettuerà così il run dell'applicazione. (In console dovrebberro apparire i risultati di 3 System.Out.print.ln(), ovvero "AuthRunner run...", "ProdottoRunner run..." e "OrdineRunner run...").

4. Decommentare nell'AuthRunner "setDefaultRoles" e "setDefaultUsers" (IN SIMULTANEA!) in modo da far creare utenti e ruoli di default.
Ricordarsi di ricommentare subito dopo, altrimenti li salva più volte (oppure potrebbe creare conflitti).

5. Procedere poi a decommentare il salvataggio di alcuni prodotti base in ProdottoRunner (dovrebbero essere 11/12), comprendono racchette, palline, corde, magliette, pantaloncini, borsoni e scarpe. Anche qui, ricordarsi di ricommentare subito dopo, altrimenti potrebbe creare conflitti (salvataggio multiplo no, perché c'è un controllo molto performante in cui se è già presente un prodotto con un nome, non se ne può inserire un altro con lo stesso nome).

6. Una volta effettuati con successo i passaggi precedenti, aprire app Angular, procedere con l'installazione dei moduli (che ovviamente non sono compresi) tramite il comando in terminale " npm i " (le virgolette non devono essere inserite nel comando), dopodiché procedere pure con la visualizzazione tramite il comando " ng s -o " (le virgolette non devono essere inserite nel comando).

Si verrà indirizzati alla pagina /home, ma non essendo autenticati, si verrà immediatamente reindirizzati alla pagina login. Qui inserire una delle due credenziali create precedentemente su Java nell'AuthRunner (si possono visualizzare username e password tra riga 88 e 102 di AuthRunner).
Tenere conto che il ruolo User può solo visualizzare quindi alcuni pulsanti non saranno visibili per non permettere di accedere ad alcune pagine, ma se anche si riuscisse ad accedere tramite URL, i tasti spariscono e appare una riga rossa di avviso in cui si legge "NON SI HA L'AUTORIZZAZIONE PER USUFRUIRE DI QUESTA FUNZIONE".

Per accedere a tutte le funzionalità, si effettui login con le credenziali da ruolo ADMIN.

NB. La prima volta che si fa un login, sia da user che da admin, potrebbero non visualizzarsi bene le informazioni in homa (tra cui un "Benvenuto," senza il nome); basta aggiornare la pagina.

Buona esperienza!

Manuel Ferrucci