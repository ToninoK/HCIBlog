def dict_to_db_format(data: dict):
    fields = [key for key in data.keys() if data[key] is not None]
    values = [data[field] for field in fields]
    fields_str = ",".join(fields)
    identifiers = ",".join(["%s"] * len(values))
    return {
        "fields_str": fields_str,
        "identifiers": identifiers,
        "values": values,
    }
