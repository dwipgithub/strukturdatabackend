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
    fs.readFile('database/penduduk.txt', 'utf8', (errPenduduk, pendudukResults) => {
        if (errPenduduk) {
            console.error('Error reading file:', errPenduduk);
        } else {
            fs.readFile('database/agama.txt', 'utf8', (errAgama, agamaResults) => {
                if (errAgama) {

                } else {
                    fs.readFile('database/provinsi.txt', 'utf8', (errProvinsi, provinsiResults) => {
                        if (errProvinsi) {
        
                        } else {
                            const penduduk = JSON.parse(pendudukResults)
                            const agama = JSON.parse(agamaResults)
                            const provinsi = JSON.parse(provinsiResults)
                            let jsonData = []
                            for(let i = 0;i < penduduk.length;i++) {
                                const indexAgama = linearSearch(agama,"id", penduduk[i].agamaId)
                                const indexProvinsi = linearSearch(provinsi,"id", penduduk[i].provinsiId)
                                const data =  {
                                    "nik": penduduk[i].nik,
                                    "nama": penduduk[i].nama,
                                    "agamaId": penduduk[i].agamaId,
                                    "agamaNama": agama[indexAgama].nama,
                                    "alamat": penduduk[i].alamat,
                                    "provinsiId": penduduk[i].provinsiId,
                                    "provinsiNama": provinsi[indexProvinsi].nama
                                }
                                jsonData.push(data)
                            }
                            // const jsonData = JSON.parse(pendudukArr)
                            const urut = req.query.urut || null
                            if (urut != null) {
                                const firstChar = getFirstChar(urut)
                                // const jsonData = JSON.parse(results)
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
                                callback(null, jsonData)
                            }
                        }
                    })
                }
            })
        }
    })
}

export const insert = (req, callback) => { 
    fs.readFile('database/penduduk.txt', 'utf8', (err, results) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            const jsonData = JSON.parse(results)
            console.log(jsonData)
            try {
                const target = req.body.nik
                // Mencari id array dengan menggunakan fungsi algoritma linear
                const index = linearSearch(jsonData,"nik", target)
                console.log(index)
                if (index === -1) {
                    // Parsing data JSON menjadi objek JavaScript
                    const jsonData = JSON.parse(results)
        
                    // Tambahkan objek JSON baru ke array
                    const newObject = {
                        nik: req.body.nik,
                        nama: req.body.nama,
                        agamaId: req.body.agamaId,
                        alamat: req.body.alamat,
                        provinsiId: req.body.provinsiId
                    }
                    jsonData.push(newObject);
        
                    // Konversikan objek JavaScript yang diperbarui kembali ke format JSON
                    const updatedJsonData = JSON.stringify(jsonData, null, 2)
        
                    // Tulis kembali data JSON yang diperbarui ke file
                    fs.writeFile('database/penduduk.txt', updatedJsonData, (err) => {
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
                console.error('Error parsing JSON data:', error);
            } 
        }
    })
}