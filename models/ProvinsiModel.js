import fs from 'fs'

// Fungsi pencarian menggunakan algoritma linear/urut
function linearSearch(arr, key, target) {
    for(let i = 0;i < arr.length;i++) {
        if (arr[i][key] == target) {
            return i
        }
    }
    return -1
}

// Fungsi pengurutan menggunakan algoritma bubble
function bubbleSort(arr, key, method){
    let swapped = true
    let n = arr.length
    do {
        swapped = false
        for(let i = 0; i < n; i++){
            if (i < n - 1){
                let dateObject1 = arr[i][key]
                let dateObject2 = arr[i + 1][key]
                if (method == 'asc') {
                    if (dateObject1 > dateObject2) {
                        let temp1 = arr[i]
                        arr[i] = arr[i + 1]
                        arr[i + 1] = temp1
                        swapped = true
                    }
                } else {
                    if (dateObject1 < dateObject2) {
                        let temp1 = arr[i]
                        arr[i] = arr[i + 1]
                        arr[i + 1] = temp1
                        swapped = true
                    }
                }
            }
        }
    } while (swapped == true)
    return JSON.stringify(arr, null, 2)
}

// Fungsi mencari character pertama dari string
function getFirstChar(str) {
    for (let i = 0; i < str.length; i++) {
        if (i === 0) {
            return str[i]
        }
    }
}

// Fungsi menghapus character pertama dari string
function customSlice(str, start = 0, end = str.length) {
    start = start < 0 ? Math.max(start + str.length, 0) : start
    end = end < 0 ? Math.max(end + str.length, 0) : Math.min(end, str.length)
    if (start >= end) {
        return ""
    }
    const result = []
    for (let i = start; i < end; i++) {
        result.push(str[i])
    }
    return result.join("")
}

export const get = (req, callback) => {
    fs.readFile('database/provinsi.txt', 'utf8', (err, results) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            const urut = req.query.urut || null
            // const firstChar = getFirstChar(urut);
            // const jsonData = JSON.parse(results)
            // const sl = customSlice(urut,1)
            
            // let urutkanBerdasarkan = sl
            // let metodePengurutan = firstChar == '-' ? 'desc' : 'asc'
            // let dataUrut = bubbleSort(jsonData, urutkanBerdasarkan, metodePengurutan)
            // callback(null, JSON.parse(dataUrut))
            if (urut != null) {
                const firstChar = getFirstChar(urut)
                const jsonData = JSON.parse(results)
                if (firstChar == "-") {
                    const sl = customSlice(urut,1)
                    let urutkanBerdasarkan = sl
                    let metodePengurutan = "desc"
                    let dataUrut = bubbleSort(jsonData, urutkanBerdasarkan, metodePengurutan)
                    callback(null, JSON.parse(dataUrut))
                } else if (firstChar == " ") {
                    const sl = customSlice(urut,1)
                    let urutkanBerdasarkan = sl
                    let metodePengurutan = "asc"
                    let dataUrut = bubbleSort(jsonData, urutkanBerdasarkan, metodePengurutan)   
                    callback(null, JSON.parse(dataUrut))
                } else {
                    let urutkanBerdasarkan = urut
                    let metodePengurutan = "asc"
                    let dataUrut = bubbleSort(jsonData, urutkanBerdasarkan, metodePengurutan)   
                    callback(null, JSON.parse(dataUrut))
                }
            } else if (urut === null) {
                const jsonData = JSON.parse(results)
                callback(null, jsonData)
            }
        }
    })
}

export const show = (req, callback) => {
    fs.readFile('database/provinsi.txt', 'utf8', (err, results) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            const jsonData = JSON.parse(results)
            const target = req.params.id
            // Mencari id array dengan menggunakan fungsi algoritma linear
            const index = linearSearch(jsonData,"id", target)
            if (index === -1) {
                const err = 'no data found'
                callback(err, null)
            } else {
                callback(null, jsonData[index])
            }
        }
    })
}

export const insert = (req, callback) => { 
    fs.readFile('database/provinsi.txt', 'utf8', (err, results) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            const jsonData = JSON.parse(results)
            try {
                const target = req.body.id
                // Mencari id array dengan menggunakan fungsi algoritma linear
                const index = linearSearch(jsonData,"id", target)
                if (index === -1) {
                    // Parsing data JSON menjadi objek JavaScript
                    const jsonData = JSON.parse(results)
        
                    // Tambahkan objek JSON baru ke array
                    const newObject = {
                        id: req.body.id,
                        nama: req.body.nama
                    }
                    jsonData.push(newObject);
        
                    // Konversikan objek JavaScript yang diperbarui kembali ke format JSON
                    const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
                    // Tulis kembali data JSON yang diperbarui ke file
                    fs.writeFile('database/provinsi.txt', updatedJsonData, (err) => {
                        if (err) {
                            console.error('Error writing JSON file:', err);
                            return;
                        }
                        callback(null, 'data berhasil ditambahkan')
                    });
                } else {
                    const err = "duplicate id"
                    callback(err, null)
                }
            } catch (error) {
                console.error('Error parsing JSON data:', parseError);
            } 
        }
    })
}

export const update = (req, callback) => {
    fs.readFile('database/provinsi.txt', 'utf8', (err, results) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            const jsonData = JSON.parse(results)
            const target = req.params.id
            const index = linearSearch(jsonData,"id", target)
            if (index === -1) {
                const err = 'no data found'
                callback(err, null)
            } else {
                // Perbarui properti objek
                jsonData[index].nama = req.body.nama

                // Konversikan objek JavaScript yang diperbarui kembali ke format JSON
                const updatedJsonData = JSON.stringify(jsonData, null, 2);

                // Tulis kembali data JSON yang diperbarui ke file
                fs.writeFile('database/provinsi.txt', updatedJsonData, (err) => {
                    if (err) {
                        console.error('Error writing JSON file:', err);
                        return;
                    }
                });
                callback(null, 'data berhasil diperbaharui')
            }
        }
    })
}