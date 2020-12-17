import alt from 'alt-server';
import chalk from 'chalk';
import {createRequire} from 'module';

const require = createRequire(import.meta.url);

var admin = require('firebase-admin');
var key = require('./key.json');

export class Firebase{ // FIREBASE
    constructor(url){
        this.credential = admin.credential.cert(key) // Ключ // Key
        this.databaseURL = url; // url database // ссылка на датабазу


    // Connect // Подключение
    try{
    admin.initializeApp({
        credential: this.credential,
        databaseURL: this.databaseURL
    })
        console.log(chalk.cyanBright('Firebase Connect!'));
        } catch (err) {
            console.log(err)
        }

        this.database = admin.firestore();
    } 
  
    addDocument(collection, document, data){ // Добавление документа 
        try{
        this.database.collection(collection).doc(String(document)).set(data);
        }
        catch(err){
            console.log(err)
        }
    }

    updateDocument(collection, document, data){ // Обновление документа
        try {
            this.database.collection(collection).doc(String(document)).update(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    async getAllDocuments(collection){ // Получение всех документов
        try {
            let data = [];
            await (await this.database.collection(collection).get()).docs.map(value => {
                data.push(value.data())
            })
            return data
        }
        catch (err) {
            console.log(err)
        }
    }

    async getDocument(collection, document) { // Получение данных из документа
        try {
            return new Promise((resolve, rejects) => {

                const result = this.database.collection(collection).doc(document).get()
                result.then(res => {
                    return resolve(res.data())
                })
                    .catch(err => {
                        return rejects(undefined)
                    })
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    deleteDocument(collection, document) { // Удаление документа
        try {
            this.database.collection(collection).doc(document).delete()
        }
        catch (err) {
            console.log(err)
        }
    }


}

try {

}
catch (err) {
    console.log(err)
}