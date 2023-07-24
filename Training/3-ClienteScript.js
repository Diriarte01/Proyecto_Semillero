/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 *@author Daniel Iriarte
 */
define([],
    function () {
        const handler = {};
        const fields = {
            firstName: 'firstname',
            phone: 'phone',
            email: 'email'
        }
        /**
         * @name pageInit
         * @param {object} context { newRecord, mode}
         * @description esta funcion se ejecuta del lado del cliente, cuando inicia la pagina
         * @returns void 
         */

        handler.pageInit = (context) => {
            const { mode, currentRecord } = context;
            if (mode == 'create') {
                alert('Hola mundo en modo creación, bienvenido a este registro')
            } else if (mode == 'edit') {
                const firstName = currentRecord.getValue('firstname')
                alert(`Hola mundo en modo edición al registro de ${firstName}, bienvenido a este registro`)
            }
        }

        /**
         * @name pageInit
         * @param {object} context { newRecord, fieldId, sublistId}
         * @description esta funcion se ejecuta del lado del cliente, cuando inicia la pagina
         * @returns void 
         */

        handler.fieldChanged = (context) => {
            const { fieldId, currentRecord } = context;
            const fieldValue = currentRecord.getValue(fieldId);
            try {
                switch (fieldId) {
                    case fields.phone: {
                        const phoneField = currentRecord.getField({ fieldId: 'homephone' })
                        if (fieldValue) {
                            phoneField.isDisabled = true;
                        } else {
                            phoneField.isDisabled = false;
                        }
                        break
                    }
                }
            } catch (e) {
                log.error('el error es: ' + e.message, e)
            }
        }

        handler.saveRecord = (context) => {
            try {
                const { currentRecord } = context;
                log.debug('context', context)
                if (currentRecord.isNew) {
                    const firstName = currentRecord.getValue('firstname')
                    if (!confirm('Esta Seguro que quiere guardar el registro de '))
                        return false
                }
                return true
            } catch (e) {
                log.error('el error es: ' + e.message, e)
            }
            const currentRecord = context.currentRecord;

        }

        handler.lineInit = (context) => {
            const { sublistId, currentRecord } = context;
            try {
                if (sublistId == 'item') {
                    currentRecord.setCurrentSublistValue({
                        sublistId: 'item',
                        fieldId: 'quantity',
                        value: 2
                    })
                }

            } catch (e) {
                log.error('el error es: ' + e.message, e)
            }
        }

        handler.validateField = (context) => {
            const { fieldId, currentRecord } = context;
            try {
                if(fieldId == 'memo'){
                    const valueLength = currentRecord.getValue('memo').length
                    if(valueLength < 7){
                        alert('Este Campo no puede contener mas de 7 caracteres');
                        return false;
                    }
                }
                return true
            } catch (e) {
                log.error('el error es: ' + e.message, e)
            }
        }

        // try{

        // }catch(e){
        //     log.error('el error es: ' + e.message, e)
        // }

        return handler
    }
);
