'use server';

import fs from 'fs/promises';
import path from 'path';

export async function exportValidEmail(email:String): Promise <{success: boolean}>{
    try{
        const filePath = path.join(process.cwd(), 'validEmails.txt');
        await fs.appendFile(filePath, email + '\n', 'utf-8');
        return {success: true};

    } catch(error){
        console.log('Error adding email to file: ', error);
        return {success:false};
    }
}